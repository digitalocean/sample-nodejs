import { ProcessType,InputType,Complexity, UserStatus } from '../../shared/types';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import IArticle, { IArticleSave, IUser, Status } from 'src/app/shared/types';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-article-import-form',
  templateUrl: './article-import.component.html',
  styleUrls: ['./article-import.component.scss']
})
export class ArticleImportComponent implements OnInit {
  jsonData:IArticleSave[]=[];
  isAdmin:boolean=false;
  constructor(private _authService: AuthService, private _articleService: ArticleService, private _userService:UserService, private _snackBar: MatSnackBar, private _dialog: MatDialogRef<ArticleImportComponent>, @Inject(MAT_DIALOG_DATA) public data: {isAdmin:boolean }) {
    this.isAdmin = data.isAdmin;
  }
  ngOnInit(): void {
    
  }
  importDashboard():void{
    if(this.jsonData.length>0){    
      this._articleService.importArticle(this.jsonData,this.isAdmin).subscribe({
        next: (data) => {
          this._snackBar.open('Article imported', "", {
            duration: 3000
          });
          this._dialog.close(true);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else{
      this._snackBar.open('No data found', "", {
        duration: 3000
      });
    }
  }
  convertDate(str:any):Date|undefined{
    if(str instanceof Date){
      // console.log(str);
      // console.log(new Date(str.setMinutes(str.getMinutes()+1)))
      //console.log(str.getTime() + (new Date().getTimezoneOffset() - str.getTimezoneOffset()) * 60000)
      return new Date(str.setMinutes(str.getMinutes()+1));
    }
    if(typeof str =="string"){
      let arr = str.split("-");
      let datte = new Date(arr[2]+"-"+arr[1]+"-"+arr[0]);
      if(!(datte instanceof Date)){
        this._snackBar.open('Date is not in proper format', "", {
          duration: 3000
        });
        this.jsonData=[];
      }
      console.log(datte);
      return datte;
    }
    return undefined;
  }
  convertData(obj:any){
    let returnObj:IArticleSave={
      client:obj["Client"],
      batch: obj["Batch/JOB ID"],
      article:obj["Article/ISBN"],
      pages: obj["Pages"],
      processType: obj["Process Type"],
      assignedTo: obj["Assigned To"],
      userstatus:obj["User Status"],
      status: obj["Status"],
      complexity:obj["Complexity"],
      inputType:obj["Input Type"],
      mathCount:obj["Math Count"],
      imagesCount:obj["Images Count"],
      // closedDate:this.convertDate(obj["Closed Date"]),
      completedDate:this.convertDate(obj["Completed Date"]),
      AdminCommand:obj["Admin Command"],
      targetDate:obj["Target Date"],
      userCompletedDate:obj["User Completed Date"],
    };
    return returnObj;
  } 
  onFileChange(ev:any) {
    let workBook:any = null;
    let readData = null;
    const reader = new FileReader();
    if(ev.target.files && ev.target.files.length>0){
      const file = ev.target.files[0];
      const ext = file.name.split(".").pop().toLowerCase();
      if(ext=="xlsx"){
        this.jsonData=[];
        reader.onload = (event) => {
          const data = reader.result;
          workBook = XLSX.read(data, { type: 'binary',cellText:false,cellDates: true,});
          readData = workBook.SheetNames.reduce((initial:any, name:any) => {
            const sheet = workBook.Sheets[name];
            initial[name] = XLSX.utils.sheet_to_json(sheet);
            return initial;
          }, {});
          if(readData){          
            let arrData = readData[Object.keys(readData)[0]];
            for(let loop=0;loop<arrData.length;loop++){
              if(!arrData[loop]["Article/ISBN"]){
                this._snackBar.open('Article/ISBN  is required in row '+(loop+1), "", {
                  duration: 3000
                });
                ev.target.value="";
                this.jsonData=[];
                break;
              }
              if(!arrData[loop]["Process Type"]){
                this._snackBar.open('Process Type is required in row '+(loop+1), "", {
                  duration: 3000
                });
                ev.target.value="";
                this.jsonData=[];
                break;
              }
              if(!arrData[loop]["Input Type"]){
                this._snackBar.open('Input Type is required in row '+(loop+1), "", {
                  duration: 3000
                });
                ev.target.value="";
                this.jsonData=[];
                break;
              }
              if(!arrData[loop]["Complexity"]){
                this._snackBar.open('Complexity is required in row '+(loop+1), "", {
                  duration: 3000
                });
                ev.target.value="";
                this.jsonData=[];
                break;
              }
              if(!arrData[loop]["Pages"]){
                this._snackBar.open('Pages is required in row '+(loop+1), "", {
                  duration: 3000
                });
                ev.target.value="";
                this.jsonData=[];
                break;
              }
              // if(!arrData[loop]["Math Count"]){
              //   this._snackBar.open('Math Count is required in row '+(loop+1), "", {
              //     duration: 3000
              //   });
              //   ev.target.value="";
              //   this.jsonData=[];
              //   break;
              // }
              // if(!arrData[loop]["Images Count"]){
              //   this._snackBar.open('Images Count is required  in row '+(loop+1), "", {
              //     duration: 3000
              //   });
              //   ev.target.value="";
              //   this.jsonData=[];
              //   break;
              // }
              if(isNaN(arrData[loop]["Pages"])){
                this._snackBar.open('Pages is numeric field in row '+(loop+1), "", {
                  duration: 3000
                });
                ev.target.value="";
                this.jsonData=[];
                break;
              }
              if(!(arrData[loop]["Status"])){
                this._snackBar.open('Status is required in row '+(loop+1), "", {
                  duration: 3000
                });
                ev.target.value="";
                this.jsonData=[];
                break;
              }
              if(Object.keys(InputType).indexOf(arrData[loop]["Input Type"])==-1){
                this._snackBar.open('Invalid input type ('+arrData[loop]["Input Type"]+') in row '+(loop+1), "", {
                  duration: 3000
                });
                ev.target.value="";
                this.jsonData=[];
                break;
              }
              if(Object.keys(Complexity).indexOf(arrData[loop]["Complexity"])==-1){
                this._snackBar.open('Invalid complexity ('+arrData[loop]["Complexity"]+') in row '+(loop+1), "", {
                  duration: 3000
                });
                ev.target.value="";
                this.jsonData=[];
                break;
              }
              if(Object.keys(ProcessType).indexOf(arrData[loop]["Process Type"])==-1){
                this._snackBar.open('Invalid process type ('+arrData[loop]["Process Type"]+') in row '+(loop+1), "", {
                  duration: 3000
                });
                ev.target.value="";
                this.jsonData=[];
                break;
              }
              if(Object.keys(Status).indexOf(arrData[loop]["Status"])==-1){
                this._snackBar.open('Invalid status ('+arrData[loop]["Status"]+') in row '+(loop+1), "", {
                  duration: 3000
                });
                ev.target.value="";
                this.jsonData=[];
                break;
              }
              if(Object.keys(UserStatus).indexOf(arrData[loop]["User Status"])==-1){
                this._snackBar.open('Invalid User Status ('+arrData[loop]["User Status"]+') in row '+(loop+1), "", {
                  duration: 3000
                });
                ev.target.value="";
                this.jsonData=[];
                break;
              }
              this.jsonData.push(this.convertData(arrData[loop]));
            }
          }
        }
        reader.readAsBinaryString(file);
      }      
      else{
        this._snackBar.open('Upload proper file', "", {
          duration: 3000
        });
      }
    }
    else{
      this._snackBar.open('Upload xlsx file', "", {
        duration: 3000
      });
    }
    
  }
}
