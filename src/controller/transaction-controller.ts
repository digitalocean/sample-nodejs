import { PagedData } from './../types';
import Savetransaction from "../service/transaction-service";
import { ITransaction, ResponseDTO, statusCode } from "../types";
import { NextFunction, Request, Response } from "express";

export default class TransactionController {
  private _transaction: Savetransaction;

  constructor() {
    this._transaction = new Savetransaction();
    this.addtransaction = this.addtransaction.bind(this);
    this.getalltransactions = this.getalltransactions.bind(this);
    this.searchtransaction = this.searchtransaction.bind(this);
    this.deletetransaction = this.deletetransaction.bind(this);
    this.updatetransaction = this.updatetransaction.bind(this);
    this.exportdata = this.exportdata.bind(this);
  }

  async addtransaction(
    request: Request<ITransaction>,
    response: Response<ResponseDTO<ITransaction>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<ITransaction>> | void> {
    try {
      const transaction: ITransaction = request.body;

      // Saving the article
      const savedtransaction = await this._transaction.addtransaction(
        transaction
      );

      const responseDTO = new ResponseDTO<ITransaction>(
        statusCode.CREATED,
        true,
        savedtransaction,
        null
      );

      return response.status(statusCode.CREATED).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }

  async getalltransactions(
    request: Request,
    response: Response<ResponseDTO<PagedData<ITransaction>>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<PagedData<ITransaction>>> | void> {
    try {
      const { sort, page, pageSize } = request.query;
      const pageNumber: number | undefined = page ? +page : undefined;
      const pageSizeNumber: number | undefined = pageSize
        ? +pageSize
        : undefined;
      const alltransaction = await this._transaction.gettransactions(
        sort as string,
        pageNumber,
        pageSizeNumber
      );
      const responseDTO = new ResponseDTO<PagedData<ITransaction>>(
        statusCode.OK,
        true,
        alltransaction,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }
  // Search a article
  async searchtransaction(
    request: Request,
    response: Response<ResponseDTO<PagedData<ITransaction>>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<PagedData<ITransaction>>> | void> {
    try {
      const { sort, page, pageSize, sd, ed, forr } = request.query;
      const pageNumber: number | undefined = page ? +page : undefined;
      const pageSizeNumber: number | undefined = pageSize
        ? +pageSize
        : undefined;

      let sdate = undefined;
      let edate= undefined;
      if(sd){
        sdate = new Date(sd as string);
      }
      if(ed){
        edate = new Date(ed as string);
      }      
      const searched = await this._transaction.searchtransaction(
        sort as string,
        forr as string,
        pageNumber,
        pageSizeNumber,
        sdate,
        edate 
      );
      const responseDTO = new ResponseDTO<PagedData<ITransaction>>(
        statusCode.OK,
        true,
        searched,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }

  //Delete transaction

  async deletetransaction(
    request: Request<ITransaction>,
    response: Response<ResponseDTO<ITransaction>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<ITransaction>> | void> {
    try {
      const { _id } = request.params;
      const deletetransaction = await this._transaction.deletetransaction(_id);
      const responseDTO = new ResponseDTO<ITransaction>(
        statusCode.OK,
        true,
        deletetransaction,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }

  // Update transaction

  async updatetransaction(
    request: Request<ITransaction>,
    response: Response<ResponseDTO<ITransaction>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<ITransaction>> | void> {
    try {
      const { _id } = request.params;
      const Transaction = request.body;

      const updatetransaction = await this._transaction.updatetransaction(
        {
          ...Transaction,
        },
        _id
      );

      const responseDTO = new ResponseDTO<ITransaction>(
        statusCode.OK,
        true,
        updatetransaction,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  async exportdata(
    request: Request,
    response: Response<Blob>,
    next: NextFunction
  ): Promise<Response<Blob> | void> {
    try {      
      const { sd, ed,filter,forr } = request.query;
      let sdate = undefined;
      let edate= undefined;
      if(sd){
        sdate = new Date(sd as string);
      }
      if(ed){
        edate = new Date(ed as string);
      }      
      const data = await this._transaction.exportdata(        
        filter as string,
        forr as string,
        sdate,
        edate,
      );
      let filename = "Transaction";
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
