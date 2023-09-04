import readXlsxFile, { ParsedObjectsResult } from "read-excel-file/node";
import ValidatorError from "../exceptions/validator-error";
import { IUserExcel } from "../types";
import { userExcelSchema } from "../validation-schema/excel-validation/user-excel-validation";
import writeXlsxFile from 'write-excel-file'
import excel from 'exceljs';
export class ExcelService {
  async read(file: any): Promise<IUserExcel[]> {
    try {
      const jsonData: ParsedObjectsResult<IUserExcel> = await readXlsxFile(file.path, {
        schema: userExcelSchema,
      });
      if (jsonData.errors.length > 0) {
        throw new ValidatorError("Please provide appropriate fields");
      }
      return jsonData.rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async exportData(columns:any[],rows:any[]):Promise<excel.Workbook>{
    columns = [...[{key:"",header:"#"}],...columns]
    let workbook = new excel.Workbook();
    workbook.creator = "";
    workbook.created = new Date();
    workbook.modified = new Date();
    let worksheet = workbook.addWorksheet("Sheet1");
    worksheet.columns = columns;
    worksheet.getRow(1).font = {bold:true};
    rows.forEach((row:any,index:any) => {
      let rrr = JSON.parse(JSON.stringify(row));
      const rowIndex = index+2;
      worksheet.addRow({...rrr});
    });
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      row.eachCell({ includeEmpty: true },function (cell, colNumber) {
          if(rowNumber > 1 && colNumber == 1){ 
            row.getCell(colNumber).value = rowNumber-1;
          }
          else if(columns[colNumber-1]&& columns[colNumber-1].formatter){
            let vv = columns[colNumber-1].formatter.call(null,row.getCell(colNumber).value,rowNumber);
            row.getCell(colNumber).value = vv;
          }
          row.getCell(colNumber).border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' }
          };
          let font = { name: "Vardana",bold:false };
          if (rowNumber == 1) {
              font.bold = true;
          }
          row.getCell(colNumber).font = font;
      });
  });
  return workbook;
    // let actualData:any = [];
    // actualData.push(columns);
    // let rows :any= [];
    // data.forEach(function(datarow:any) {
    //   let obj:any = {};
    //   columns.forEach(function(column:any) {        
    //     obj["value"] = datarow[column.key];
    //   });
    //   rows.push(obj);
    // }); 
    // actualData.push(rows);
    // console.log(actualData);
    // return await writeXlsxFile(actualData);

  }
}
