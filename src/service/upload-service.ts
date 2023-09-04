import { conn } from "../database";
import User from "../models/user";
import { IUserExcel, ModelType } from "../types";
import { ExcelService } from "./excel-service";
import bcrypt from "bcrypt";

export default class UploadService {
  private _excelService: ExcelService;

  constructor() {
    this._excelService = new ExcelService();

    //bind
    this.upload = this.upload.bind(this);
    this.uploadUsers = this.uploadUsers.bind(this);
  }

  async upload(model: ModelType, file: Express.Multer.File): Promise<string> {
    try {
      switch (model) {
        case ModelType.USER:
          const data: IUserExcel[] = await this._excelService.read(file);
          await this.uploadUsers(data);
          return "OK";
        default:
          break;
      }
      return "OK";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async uploadUsers(data: IUserExcel[]): Promise<string> {
    const session = await conn.startSession();
    try {
      session.startTransaction();
      const hashedPassword = await bcrypt.hash("password", 6);
      
      const insertingData = data.map((d) => {
        const D = {
          ...d,
          password: hashedPassword,
          contactPerson: {
            name: d.contactPerson.contactPersonName,
            email: d.contactPerson.contactPersonEmail,
            mobileNo: d.contactPerson.contactPersonMobileNo,
          },
        };
        return D;
      });

      const uploadedData = await User.insertMany(insertingData, {
        session: session,
      });

      session.commitTransaction();

      return "OK";
    } catch (error) {
      session.abortTransaction();
      throw error;
    }
  }
}
