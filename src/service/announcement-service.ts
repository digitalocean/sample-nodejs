import mongoose from 'mongoose';
import { IAnnouncement, PagedData } from "../types";
import Announcement from "../models/announcement";
import ValidatorError from "../exceptions/validator-error";
import { createStartAndEndIndex } from "../utils";
import { ExcelService } from "./excel-service";
import excel from 'exceljs';
import Article from '../models/article';
export default class AnnouncementService {
  private _excelService: ExcelService;
  constructor() {
    this._excelService = new ExcelService();
  }

  async addAnnouncement(announcement: IAnnouncement): Promise<IAnnouncement> {
    try {      
      const announcementObj = new Announcement(announcement);
      const savedannouncement = await announcementObj.save();
      return savedannouncement;
         
     
    } catch (error) {
      throw error;
    }
  }
async updateAnnouncement(announcement: IAnnouncement,id:string): Promise<IAnnouncement> {
    try {
      
      const update = await Announcement.findOneAndUpdate(
        { _id: id },
        announcement,
        { runValidators: true }
      );
      if (!update) {
        throw new ValidatorError("Announcement not found");
      }
      const updated = await Announcement.findOne({ _id: id });
      return updated;     
    } catch (error) {
      throw error;
    }
  }
  async getallannouncements(
    sortParam: string,
    page?: number,
    pageSize?: number
    ): Promise<PagedData<IAnnouncement>> {
    try {
      const { startIndex, endIndex } = createStartAndEndIndex(page, pageSize);
      const getallusers: IAnnouncement[] = await Announcement.find()
        .sort("-createdAt")
        .skip(startIndex)
        .limit(endIndex);
        const rdata :PagedData<IAnnouncement>={
          data : getallusers,
          totalRows:await Announcement.countDocuments()
        };
      return rdata;
    } catch (error) {
      throw error;
    }
  }
  async deleteAnnouncement(announcementId: string): Promise<IAnnouncement> {
    try {
      const checkArticles = await Article.findOne({assignedTo:announcementId});
      if(checkArticles){
        throw new ValidatorError("Unable to delete, Announcement is mapped with articles");
      }
      const deleted = await Announcement.findOneAndDelete({ _id: announcementId });
      if (!deleted) {
        throw new ValidatorError("announcement not found");
      }
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  async exportdata(): Promise<excel.Workbook> {
    try {      
      const data: IAnnouncement[] = await Announcement.find().sort("-createdAt");
      let columns:any[] = [
        {
          key:"announcement",
          header:"Announcement"
        },
        {
          key:"active",
          header:"Active"
        }, 
      ];
      let exportedData = await this._excelService.exportData(columns,data);
      return exportedData;
    } catch (error) {
      throw error;
    }
  }
}
