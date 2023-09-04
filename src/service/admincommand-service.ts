import mongoose from 'mongoose';
import { IAdminCommand, PagedData } from "../types";
import AdminCommand from "../models/admincommand";
import ValidatorError from "../exceptions/validator-error";
import { createStartAndEndIndex } from "../utils";
import { ExcelService } from "./excel-service";
import excel from 'exceljs';
import Article from '../models/article';
export default class AdminCommandService {
  private _excelService: ExcelService;
  constructor() {
    this._excelService = new ExcelService();
  }

  async addAdminCommand(admincommand: IAdminCommand): Promise<IAdminCommand> {
    try {      
      const admincommandObj = new AdminCommand(admincommand);
      const savedadmincommand = await admincommandObj.save();
      return savedadmincommand;
         
     
    } catch (error) {
      throw error;
    }
  }
async updateAdminCommand(admincommand: IAdminCommand,id:string): Promise<IAdminCommand> {
    try {
      
      const update = await AdminCommand.findOneAndUpdate(
        { _id: id },
        admincommand,
        { runValidators: true }
      );
      if (!update) {
        throw new ValidatorError("AdminCommand not found");
      }
      const updated = await AdminCommand.findOne({ _id: id });
      return updated;     
    } catch (error) {
      throw error;
    }
  }
  async getalladmincommands(): Promise<PagedData<IAdminCommand>> {
    try {
      const getalladmincommands: IAdminCommand[] = await AdminCommand.find()
        .sort("-createdAt");
        const rdata :PagedData<IAdminCommand>={
          data : getalladmincommands,
          totalRows:await AdminCommand.countDocuments()
        };     
      return rdata;
    } catch (error) {
      throw error;
    }
  }
  async deleteAdminCommand(admincommandId: string): Promise<IAdminCommand> {
    try {
      const checkArticles = await Article.findOne({assignedTo:admincommandId});
      if(checkArticles){
        throw new ValidatorError("Unable to delete, AdminCommand is mapped with articles");
      }
      const deleted = await AdminCommand.findOneAndDelete({ _id: admincommandId });
      if (!deleted) {
        throw new ValidatorError("admin command not found");
      }
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}
