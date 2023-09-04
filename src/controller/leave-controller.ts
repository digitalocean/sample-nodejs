import { PagedData } from '../types';
import LeaveService from "../service/leave-service";
import { NextFunction, Request, Response } from "express";
import { IResetPassword, ILeave, ResponseDTO, statusCode } from "../types";

export default class LeaveController {
  private _leave: LeaveService;

  constructor() {
    this._leave = new LeaveService();

    this.addLeave = this.addLeave.bind(this);
    this.getallleaves = this.getallleaves.bind(this);
    this.updateLeave = this.updateLeave.bind(this);
    this.deleteLeave = this.deleteLeave.bind(this);
    this.exportdata = this.exportdata.bind(this);
    this.ApproveLeave = this.ApproveLeave.bind(this);
  }

  async addLeave(
    request: Request<ILeave>,
    response: Response<ResponseDTO<ILeave>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<ILeave>> | void> {
    try {
      const leave = request.body;
      // saving
      const saved = await this._leave.addLeave(leave);

      const responseDTO = new ResponseDTO<ILeave>(
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

  async updateLeave(
    request: Request<ILeave>,
    response: Response<ResponseDTO<ILeave>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<ILeave>> | void> {
    try {
      const { _id } = request.params;
      const leave: ILeave = request.body;
      // saving
      const saved = await this._leave.updateLeave(
        {
          ...leave
        }, _id);

      const responseDTO = new ResponseDTO<ILeave>(
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

  async getallleaves(
    request: Request,
    response: Response<ResponseDTO<PagedData<ILeave>>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<PagedData<ILeave>>> | void> {
    try {
      const { sort, page, pageSize, userWise } = request.query;
      const pageNumber: number | undefined = page ? +page : undefined;
      const pageSizeNumber: number | undefined = pageSize
        ? +pageSize
        : undefined;

      let userId: string | undefined = "0";
      if (userWise && userWise == "true") {
        userId = request.user?._id;
      }
      const allleave = await this._leave.getallleaves(
        sort as string,
        pageNumber,
        pageSizeNumber,
        userId);
      const responseDTO = new ResponseDTO<PagedData<ILeave>>(
        statusCode.OK,
        true,
        allleave,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }
  async deleteLeave(
    request: Request<ILeave>,
    response: Response<ResponseDTO<ILeave>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<ILeave>> | void> {
    try {
      const { _id } = request.params;
      const deleteLeave = await this._leave.deleteLeave(_id);
      const responseDTO = new ResponseDTO<ILeave>(
        statusCode.OK,
        true,
        deleteLeave,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }

  async ApproveLeave(
    request: Request,
    response: Response<ResponseDTO<ILeave>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<ILeave>> | void> {
    try {
      const { _id } = request.params;
      const { approval } = request.query;
      const deleteLeave = await this._leave.ApproveLeave(_id, approval as string);
      const responseDTO = new ResponseDTO<ILeave>(
        statusCode.OK,
        true,
        deleteLeave,
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
      const { userWise } = request.query;
      let userId: string = "0";
      if (userWise && userWise == "true") {
        if (request.user?._id) {
          userId = request.user?._id;
        }
      }
      const data = await this._leave.exportdata(userId);
      let filename = "Leaves";
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
