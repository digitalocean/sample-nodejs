import mongoose from 'mongoose';
import { ILeave, PagedData } from "../types";
import Leave from "../models/leave";
import ValidatorError from "../exceptions/validator-error";
import { createStartAndEndIndex, getCurrentDateWithTime } from "../utils";
import { ExcelService } from "./excel-service";
import excel from 'exceljs';
import Article from '../models/article';
export default class LeaveService {
  private _excelService: ExcelService;
  constructor() {
    this._excelService = new ExcelService();
  }

  async addLeave(leave: ILeave): Promise<ILeave> {
    try {
      const leaveObj = new Leave(leave);
      const savedleave = await leaveObj.save();
      return savedleave;


    } catch (error) {
      throw error;
    }
  }
  async updateLeave(leave: ILeave, id: string): Promise<ILeave> {
    try {

      const update = await Leave.findOneAndUpdate(
        { _id: id },
        leave,
        { runValidators: true }
      );
      if (!update) {
        throw new ValidatorError("Leave not found");
      }
      const updated = await Leave.findOne({ _id: id });
      return updated;
    } catch (error) {
      throw error;
    }
  }

  async ApproveLeave(id: string, approval: string): Promise<ILeave> {
    try {
      let leave: any = await Leave.findOne({ _id: id });
      console.log(leave);
      if (leave) {
        leave.approval = (approval == "true");
        leave.approvedDate = getCurrentDateWithTime();
      }
      const update = await Leave.findOneAndUpdate(
        { _id: id },
        leave,
        { runValidators: true }
      );
      if (!update) {
        throw new ValidatorError("Leave not found");
      }
      const updated = await Leave.findOne({ _id: id });
      return updated;
    } catch (error) {
      throw error;
    }
  }
  async getallleaves(
    sortParam: string,
    page?: number,
    pageSize?: number,
    userId?: string
  ): Promise<PagedData<ILeave>> {
    try {
      let where: any = {};
      if (userId && userId != "0") {
        where = { appliedBy: userId };
      }
      const { startIndex, endIndex } = createStartAndEndIndex(page, pageSize);
      const getallusers: ILeave[] = await Leave.find(where)
        .sort("-dateOfLeave")
        .skip(startIndex)
        .limit(endIndex).populate("appliedBy","name username employeeId email");
      const rdata: PagedData<ILeave> = {
        data: getallusers,
        totalRows: await Leave.countDocuments()
      };
      return rdata;
    } catch (error) {
      throw error;
    }
  }
  async deleteLeave(leaveId: string): Promise<ILeave> {
    try {
      const deleted = await Leave.findOneAndDelete({ _id: leaveId });
      if (!deleted) {
        throw new ValidatorError("leave not found");
      }
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  async exportdata(userId?: string): Promise<excel.Workbook> {
    try {
      let where: any = {};
      if (userId && userId != "0") {
        where = { appliedBy: userId };
      }
      const data: ILeave[] = await Leave.find(where).sort("-dateOfLeave").populate("appliedBy","name username employeeId email");
      let columns: any[] = [
        {
          header: "Applied",
          key: "appliedBy",
          formatter: function (value: string, rowNum: number) {
            if (rowNum > 1) {
              let usr: any = value;
              if (typeof usr == "string") {
                usr = JSON.parse(usr);
              }
              if (usr) {
                return usr.employeeId;
              }
              return "";
            }
            return value;
          }
        },
        {
          key: "dateOfLeave",
          header: "Date of Leave",
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
        {
          key: "reason",
          header: "Reason"
        },
        {
          key: "approval",
          header: "Approval Status",
          formatter: function (value: string, rowNum: number) {
            if (rowNum > 1) {
              if (value == null || value == "null") {
                return "To be approved";
              }
              else if (value == "true" || value == "True") {
                return "Approved";
              }
              else {
                return "Rejected";
              }
            }
            return value;
          }
        },
      ];
      let exportedData = await this._excelService.exportData(columns, data);
      return exportedData;
    } catch (error) {
      throw error;
    }
  }
}
