import ValidatorError from "../exceptions/validator-error";
import Transaction from "../models/transaction";
import { ITransaction, PagedData } from "../types";
import { createStartAndEndIndex, getCurrentDate } from "../utils";
import excel from 'exceljs';
import { ExcelService } from "./excel-service";
export default class Savetransaction {
  private _excelService: ExcelService;
  constructor() {
    this._excelService = new ExcelService();
  }
  // add transaction
  async addtransaction(transaction: ITransaction): Promise<ITransaction> {
    try {
      transaction.date = new Date(getCurrentDate(transaction.date));
      const transactionObj = new Transaction(transaction);
      const savedtransaction = await transactionObj.save();
      return savedtransaction;
    } catch (error) {
      throw error;  
    }
  }

  // get all transactions

  async gettransactions(
    sortParam: string,
    page?: number,
    pageSize?: number
  ): Promise<PagedData<ITransaction>> {
    try {
      const { startIndex, endIndex } = createStartAndEndIndex(page, pageSize);
      const gettransaction: ITransaction[] = await Transaction.find()
        .sort("-createdAt")
        .skip(startIndex)
        .limit(endIndex).populate("userList","name username employeeId email");
        const rdata :PagedData<ITransaction>={
          data : gettransaction,
          totalRows:await Transaction.countDocuments()
        };    
      return rdata;
    } catch (error) {
      throw error;
    }
  }

  // Search
  async searchtransaction(    
    sortParam: string,
    forr:string,
    page?: number,
    pageSize?: number,
    sd?: Date,
    ed?: Date,    
  ): Promise<PagedData<ITransaction>> {
    try {      
      const { startIndex, endIndex } = createStartAndEndIndex(page, pageSize);
      let where :any = {};
      if(forr!="ALL"){
        where.for={
          $eq:forr
        }
      }

      if(sd && ed){
        where.date= {
          $gte: getCurrentDate(sd),
          $lte: getCurrentDate(ed),
        }
      }
      else if(sd){
        where.date= {
          $gte: getCurrentDate(sd)
        }
      }
      else if(ed){
        where.date= {
          $lte: getCurrentDate(ed)
        }
      }
      const search: ITransaction[] = await Transaction.find({        
        ...where
      })
        .sort("-createdAt")
        .skip(startIndex)
        .limit(endIndex).populate("userList","name username employeeId email");;

        const rdata :PagedData<ITransaction>={
          data : search,
          totalRows:await Transaction.countDocuments({
            ...where
          })
        };    
      return rdata;
    } catch (error) {
      throw error;
    }
  }

  // Delete transaction
  async deletetransaction(transactionId: string): Promise<ITransaction> {
    try {
      const deleted = await Transaction.findOneAndDelete({
        _id: transactionId,
      });
      if (!deleted) {
        throw new ValidatorError("Transactiion not found");
      }
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  // Update transaction

  async updatetransaction(
    transaction: ITransaction,
    transactionId: string
  ): Promise<ITransaction> {
    try {
      const update = await Transaction.findOneAndUpdate(
        { _id: transactionId },
        transaction
      );
      if (!update) {
        throw new ValidatorError("Transaction not found");
      }
      const updated = await Transaction.findOne({ _id: transactionId });
      return updated;
    } catch (error) {
      throw error;
    }
  }

  async exportdata(    
    filter:string,
    forr:string,
    sd?: Date,
    ed?: Date,
  ): Promise<excel.Workbook> {
    try {      
      let where:any = {};
      if(filter =="true"){
        where = {
          
        }

        if(sd && ed){
          where.date= {
            $gte: getCurrentDate(sd),
            $lte: getCurrentDate(ed),
          }
        }
        else if(sd){
          where.date= {
            $gte: getCurrentDate(sd)
          }
        }
        else if(ed){
          where.date= {
            $lte: getCurrentDate(ed)
          }
        }

        if(forr!="ALL"){
          where.for={
            $eq:forr
          }
        }
      }
      const data: ITransaction[] = await Transaction.find(where)
      .sort("-createdAt")
      .populate("userList","name username employeeId email");;

      let columns:any[] = [
        {
          key:"invoice",
          header:"Invoice"
        },      
        {
          header:"Beneficiary",
          key:"for"
        },
        {
          header:"Beneficiary Name",
          key:"userList",
          formatter:function(value:any[],rowNum:number){
            if(rowNum>1){
              return value.map((user:any)=>{
                if(typeof user =="object")
                  return user.username
                return "";
                }).join(", ")
            }
          }
        },
        {
          header:"Transaction Date",
          key:"date",
          formatter: function(value:string,rowNum:number){
            if(rowNum>1){
              if(value){
                let dd = value.split("T")[0];
                let date : Date = new Date(dd)
                if(date.toString() !== "Invalid Date"){
                  return date;
                }              
              }
            }
            return value;
          }
        },
        {
          header:"Paid",
          key:"paid"
        },
        {
          header:"Recieved",
          key:"recieved"
        },
        {
          key:"description",
          header:"Description"
        },
      ];      
      let exportedData = await this._excelService.exportData(columns,data);
      return exportedData;
    } catch (error) {
      throw error;
    }
  }
}
