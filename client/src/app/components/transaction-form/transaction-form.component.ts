import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { ITransaction, IUser, UserType } from 'src/app/shared/types';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  userDropdownList:IUser[]|null = [];
  userSelectedItems = [];
  formData: ITransaction = {
    invoice: "",
    date: new Date(),
    description: "",
    for: UserType.EMP,
    paid: 0,
    recieved: 0,
    userList:[],
  }

  options = [
    { key: "EMP", value: UserType.EMP },
    { key: "SUP", value: UserType.SUP },
    { key: "CLIENT", value: UserType.CLIENT },
  ]

  constructor(private _transactionService: TransactionService,private _userService:UserService, private _snackBar: MatSnackBar, private _dialog: MatDialogRef<TransactionFormComponent>, @Inject(MAT_DIALOG_DATA) public data: { transaction: ITransaction, title: string }) {
    if (this.data.transaction) {
      this.formData = this.data.transaction;
      this.onSelectChange(this.data.transaction.for);
      const userll:any[] = this.data.transaction.userList;
      this.formData.userList = userll.map((user)=>{
        if(typeof user=="object")
          return user._id;
        return user;
      });
    }  
    else{
      this.onSelectChange(UserType.EMP); 
    }
  }

  ngOnInit(): void {
  }

  createTransaction(): void {
    this._transactionService.savetransaction(this.formData).subscribe({
      next: (data) => {
        this._snackBar.open("Transaction saved successfully.", "", {
          duration: 3000
        });
        this._dialog.close(true);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  updateTransaction(): void {
    this._transactionService.updateTransaction(this.formData, this.data.transaction._id!).subscribe({
      next: (data) => {
        this._snackBar.open("Transaction updated successfully.", "", {
          duration: 3000
        });
        this._dialog.close(true);
      },
      error: (err) => {
        console.error(err);
        this._snackBar.open("Something went wrong. Please, try again.");
      }
    })
  }

  onClickSuccess(): void {
    if (this.data.transaction) {
      this.updateTransaction();
      return;
    }
    this.createTransaction();
  }
  onSelectChange(value:string):void{
    this._userService.getByRole(value).subscribe({
      next: (data) => {
        if(this.data!=null&&this.data!=undefined){
          this.userDropdownList = data.data;
        }
      },
      error: (err) => {
        console.error(err);
        this._snackBar.open("Something went wrong. Please, try again.", "", {
          duration: 3000
        });
      }
    })
  }
}
