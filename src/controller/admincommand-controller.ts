import { PagedData } from '../types';
import AdminCommandService from "../service/admincommand-service";
import { NextFunction, Request, Response } from "express";
import { IResetPassword, IAdminCommand, ResponseDTO, statusCode } from "../types";

export default class AdminCommandController {
  private _admincommand: AdminCommandService;

  constructor() {
    this._admincommand = new AdminCommandService();
    
    this.addAdminCommand = this.addAdminCommand.bind(this);
    this.getalladmincommands = this.getalladmincommands.bind(this);
    this.updateAdminCommand = this.updateAdminCommand.bind(this);
    this.deleteAdminCommand = this.deleteAdminCommand.bind(this);
  }

  async addAdminCommand(
    request: Request<IAdminCommand>,
    response: Response<ResponseDTO<IAdminCommand>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IAdminCommand>> | void> {
    try {
      const admincommand = request.body;
      // saving
      const saved = await this._admincommand.addAdminCommand(admincommand);

      const responseDTO = new ResponseDTO<IAdminCommand>(
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

  async updateAdminCommand(
    request: Request<IAdminCommand>,
    response: Response<ResponseDTO<IAdminCommand>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IAdminCommand>> | void> {
    try {
      const { _id } = request.params;
      const admincommand: IAdminCommand = request.body;
      // saving
      const saved = await this._admincommand.updateAdminCommand(
        {
          ...admincommand
        }, _id);

      const responseDTO = new ResponseDTO<IAdminCommand>(
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

  async getalladmincommands(
    request: Request,
    response: Response<ResponseDTO<PagedData<IAdminCommand>>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<PagedData<IAdminCommand>>> | void> {
    try {
      const alladmincommand = await this._admincommand.getalladmincommands();
      const responseDTO = new ResponseDTO<PagedData<IAdminCommand>>(
        statusCode.OK,
        true,
        alladmincommand,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }
  async deleteAdminCommand(
    request: Request<IAdminCommand>,
    response: Response<ResponseDTO<IAdminCommand>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IAdminCommand>> | void> {
    try {
      const { _id } = request.params;
      const deleteAdminCommand = await this._admincommand.deleteAdminCommand(_id);
      const responseDTO = new ResponseDTO<IAdminCommand>(
        statusCode.OK,
        true,
        deleteAdminCommand,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }
}
