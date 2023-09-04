import { PagedData } from '../types';
import AnnouncementService from "../service/announcement-service";
import { NextFunction, Request, Response } from "express";
import { IResetPassword, IAnnouncement, ResponseDTO, statusCode } from "../types";

export default class AnnouncementController {
  private _announcement: AnnouncementService;

  constructor() {
    this._announcement = new AnnouncementService();
    
    this.addAnnouncement = this.addAnnouncement.bind(this);
    this.getallannouncements = this.getallannouncements.bind(this);
    this.updateAnnouncement = this.updateAnnouncement.bind(this);
    this.deleteAnnouncement = this.deleteAnnouncement.bind(this);
    this.exportdata = this.exportdata.bind(this);
  }

  async addAnnouncement(
    request: Request<IAnnouncement>,
    response: Response<ResponseDTO<IAnnouncement>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IAnnouncement>> | void> {
    try {
      const announcement = request.body;
      // saving
      const saved = await this._announcement.addAnnouncement(announcement);

      const responseDTO = new ResponseDTO<IAnnouncement>(
        statusCode.CREATED,
        true,
        saved,
        null
      );

      return response.status(statusCode.CREATED).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }

  async updateAnnouncement(
    request: Request<IAnnouncement>,
    response: Response<ResponseDTO<IAnnouncement>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IAnnouncement>> | void> {
    try {
      const { _id } = request.params;
      const announcement: IAnnouncement = request.body;
      // saving
      const saved = await this._announcement.updateAnnouncement(
        {
          ...announcement
        }, _id);

      const responseDTO = new ResponseDTO<IAnnouncement>(
        statusCode.OK,
        true,
        saved,
        null
      );

      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }

  async getallannouncements(
    request: Request,
    response: Response<ResponseDTO<PagedData<IAnnouncement>>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<PagedData<IAnnouncement>>> | void> {
    try {
      const { sort, page, pageSize } = request.query;
      const pageNumber: number | undefined = page ? +page : undefined;
      const pageSizeNumber: number | undefined = pageSize
        ? +pageSize
        : undefined;
      const allannouncement = await this._announcement.getallannouncements(
        sort as string,
        pageNumber,
        pageSizeNumber);
      const responseDTO = new ResponseDTO<PagedData<IAnnouncement>>(
        statusCode.OK,
        true,
        allannouncement,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }
  async deleteAnnouncement(
    request: Request<IAnnouncement>,
    response: Response<ResponseDTO<IAnnouncement>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IAnnouncement>> | void> {
    try {
      const { _id } = request.params;
      const deleteAnnouncement = await this._announcement.deleteAnnouncement(_id);
      const responseDTO = new ResponseDTO<IAnnouncement>(
        statusCode.OK,
        true,
        deleteAnnouncement,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }
  async exportdata(
    request: Request,
    response: Response<Blob>,
    next: NextFunction
  ): Promise<Response<Blob> | void> {
    try {
      const data = await this._announcement.exportdata();
      let filename = "Announcements";
      response.set({
        "Content-disposition": `attachment; filename=${filename}.xlsx`,
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      return data.xlsx.write(response).then(() => {
        response.status(statusCode.OK).end();
      });
    } catch (error) {
      return next(error);
    }
  }
}
