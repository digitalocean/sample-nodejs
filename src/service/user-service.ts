import mongoose from 'mongoose';
import { IUser, UserType, IResetPassword, PagedData } from "../types";
import User from "../models/user";
import bcrypt from "bcrypt";
import ValidatorError from "../exceptions/validator-error";
import { createStartAndEndIndex } from "../utils";
import { ExcelService } from "./excel-service";
import excel from 'exceljs';
import Article from '../models/article';
export default class UserService {
  private _excelService: ExcelService;
  constructor() {
    this._excelService = new ExcelService();
  }

  async addUser(user: IUser): Promise<IUser> {
    try {
      const retrievedUser = await User.findOne({
        $or: [
          {
            email: user.email,
          },
          {
            username: user.username,
          },
        ],
      });

      if (retrievedUser) {
        if (retrievedUser.username === user.username) {
          throw new ValidatorError("Username is already in use");
        }
        if (retrievedUser.email === user.email) {
          throw new ValidatorError("Email is already in use");
        }
      }

      const hashedPassword = await bcrypt.hash(user.password, 6);
      user.password = hashedPassword;
      const userObj = new User(user);
      const saveduser = await userObj.save();
      return saveduser;


    } catch (error) {
      throw error;
    }
  }
  async updateUser(user: IUser, id: string): Promise<IUser> {
    try {
      // // validate user     
      // const retrievedUser = await User.findOne({
      //   // $and:[
      //   //   {            
      //       $and:[
      //         {_id:{ $ne: new mongoose.Types.ObjectId(id) }},
      //         {
      //           $or: [
      //             {
      //               email: user.email,
      //             },
      //             {
      //               username: user.username,
      //             }
      //           ]
      //         }
      //     ]

      //   //   },
      //   //   {
      //   //     $or: [
      //   //       {
      //   //         email: user.email,
      //   //       },
      //   //       {
      //   //         username: user.username,
      //   //       },
      //   //     ]
      //   //   }            
      //   // ]         
      // });

      // if (retrievedUser) {
      //   if (retrievedUser.username === user.username) {
      //     throw new ValidatorError("Username is already in use");
      //   }
      //   if (retrievedUser.email === user.email) {
      //     throw new ValidatorError("Email is already in use");
      //   }
      // }
      // const hashedPassword = await bcrypt.hash(user.password, 6);
      // user.password = hashedPassword;
      const userObj = user;
      //console.log(userObj);
      const update = await User.findOneAndUpdate(
        { _id: id },
        userObj,
        { runValidators: true }
      );
      if (!update) {
        throw new ValidatorError("User not found");
      }
      const updated = await User.findOne({ _id: id });
      return updated;
    } catch (error) {
      throw error;
    }
  }
  async getallusers(
    sortParam: string,
    page?: number,
    pageSize?: number
  ): Promise<PagedData<IUser>> {
    try {
      const { startIndex, endIndex } = createStartAndEndIndex(page, pageSize);
      const getallusers: IUser[] = await User.find({
        type: { $ne: UserType.ADMIN },
      })
        .sort("-createdAt")
        .skip(startIndex)
        .limit(endIndex).select("-photo");
      const rdata: PagedData<IUser> = {
        data: getallusers,
        totalRows: await User.countDocuments({
          type: { $ne: UserType.ADMIN },
        })
      };
      return rdata;
    } catch (error) {
      throw error;
    }
  }

  async searchUsers(
    sortParam: string,
    employeename: string,
    page?: number,
    pageSize?: number,
  ): Promise<PagedData<IUser>> {
    try {
      let where: any = { type: { $ne: UserType.ADMIN } };

      if (employeename) {
        where.name = { $regex: '.*' + employeename + '.*' };
      }

      const { startIndex, endIndex } = createStartAndEndIndex(page, pageSize);
      const getallusers: IUser[] = await User.find(where)
        .sort("-createdAt")
        .skip(startIndex)
        .limit(endIndex).select("-photo");
      const rdata: PagedData<IUser> = {
        data: getallusers,
        totalRows: await User.countDocuments(where)
      };
      return rdata;
    } catch (error) {
      throw error;
    }
  }


  async getforgotpasswordlist(
    sortParam: string,
    page?: number,
    pageSize?: number
  ): Promise<IUser[]> {
    try {
      const { startIndex, endIndex } = createStartAndEndIndex(page, pageSize);
      const getallusers: IUser[] = await User.find({
        forgotPassword: { $eq: true },
      })
        .sort("-createdAt")
        .skip(startIndex)
        .limit(endIndex).select("-photo");
      return getallusers;
    } catch (error) {
      throw error;
    }
  }


  async resetPassword(user: IResetPassword): Promise<IUser> {
    try {
      const objId = new mongoose.Types.ObjectId(user._id);
      const retrievedUser = await User.findOne({
        _id: objId
      });
      const hashedPassword = await bcrypt.hash(user.password, 6);
      retrievedUser.password = hashedPassword;
      retrievedUser.forgotPassword = false;
      const saveduser = await retrievedUser.save();
      return saveduser;
    } catch (error) {
      throw error;
    }
  }

  async exportdata(filter: string, employeename: string): Promise<excel.Workbook> {
    try {
      let where: any = { type: { $ne: UserType.ADMIN } };
      if (filter == "true") {
        if (employeename) {
          where.name = { $regex: '.*' + employeename + '.*' };
        }
      }
      const data: IUser[] = await User.find(where).sort("-createdAt").select("-photo");
      let columns: any[] = [
        {
          key: "username",
          header: "Username"
        },
        {
          key: "name",
          header: "Name"
        },
        {
          header: "Address",
          key: "address"
        },
        {
          header: "ID",
          key: "employeeId"
        },
        {
          header: "Mobile",
          key: "mobileNo"
        },
        {
          header: "Email",
          key: "email"
        },
        {
          header: "Contact Person",
          key: "cname"
        },
        {
          header: "Contact Person Mobile",
          key: "cmobileNo"
        },
        {
          header: "Joining Date",
          key: "joiningDate",
          formatter: function (value: string, rowNum: number) {
            if (rowNum > 1) {
              if (value) {
                let dd = value.split("T")[0];
                let date: Date = new Date(dd)
                if (date.toString() !== "Invalid Date") {
                  return date;
                }
              }
            }
            return value;
          }
        },
      ];
      let convertedData = data.map(function (row) {
        let rrow = JSON.parse(JSON.stringify(row));
        rrow["cname"] = rrow.contactPerson.name;
        //rrow["cemail"]=rrow.contactPerson.email;
        rrow["cmobileNo"] = rrow.contactPerson.mobileNo;
        delete rrow.contactPerson;
        return rrow;
      })
      let exportedData = await this._excelService.exportData(columns, convertedData);
      return exportedData;
    } catch (error) {
      throw error;
    }
  }


  async getNonAdmin(): Promise<IUser[]> {
    try {
      const getallusers: IUser[] = await User.find({
        type: { $ne: UserType.ADMIN },
      })
        .sort("username").select("-photo")
      return getallusers;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<IUser> {
    try {
      const checkArticles = await Article.findOne({ assignedTo: userId });
      if (checkArticles) {
        throw new ValidatorError("Unable to delete, User is mapped with articles");
      }
      const deleted = await User.findOneAndDelete({ _id: userId });
      if (!deleted) {
        throw new ValidatorError("user not found");
      }
      return deleted;
    } catch (error) {
      throw error;
    }
  }
  async getByEmpId(empId?: string): Promise<IUser | null> {
    try {
      const finduser = await User.find({ employeeId: empId }).select("-photo");
      if (finduser && finduser.length > 0) {
        return finduser[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  async getByEmail(email?: string): Promise<IUser | null> {
    try {
      const finduser = await User.find({ email: email }).select("-photo");
      if (finduser && finduser.length > 0) {
        return finduser[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  async updatePhoto(id: string, photo: Buffer): Promise<IUser> {
    try {
      const update = await User.findOneAndUpdate(
        { _id: id },
        { photo: photo },
        { new: true }
      );
      if (!update) {
        throw new ValidatorError("User not found");
      }
      const updated = await User.findOne({ _id: id });
      return updated;
    } catch (error) {
      throw error;
    }
  }
  async getById(id: string): Promise<IUser> {
    try {
      const finduser = await User.findOne({ _id: id });
      return finduser;
    } catch (error) {
      throw error;
    }
  }
  async getByRole(role: string): Promise<IUser[]> {
    try {
      const finduser = await User.find({ type: role }).select("-photo");
      return finduser;
    } catch (error) {
      throw error;
    }
  }
}
