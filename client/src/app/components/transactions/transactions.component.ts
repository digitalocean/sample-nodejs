import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TransactionService } from 'src/app/services/transaction.service';
import { ITransaction, PagedData, UserType } from 'src/app/shared/types';
import { TransactionDeleteComponent } from '../transaction-delete/transaction-delete.component';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  loading: boolean = false;
  searched:boolean = false;
  for:string = "ALL";
  totalRows:number=0;
  page:number = 1;
  pageSize:number=10;
  options = [
    { key: "ALL", value: "ALL" },
    { key: "EMP", value: UserType.EMP },
    { key: "SUP", value: UserType.SUP },
    { key: "CLIENT", value: UserType.CLIENT },
  ]

  displayedColumns: string[] = [
    '#',
    'Invoice',
    'Beneficiary',
    'Beneficiary Name',
    'Transcation Date',
    'Paid amount (INR)',
    'Received amount (INR)',
    'Description'
  ];
  dataSource: ITransaction[] = [];
  startDate?: Date = undefined;
  endDate?: Date = undefined;

  constructor(private _transactionService: TransactionService, private _dialog: MatDialog) {
    this.getTransactions();
  }

  getTransactions(): void {
    this.loading = true;
    this._transactionService.getAllTransactions(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.loading = false;
        const resdata = data.data as PagedData<ITransaction>;
        this.dataSource = resdata.data!;
        this.totalRows = resdata.totalRows;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    });
  }

  ngOnInit(): void {}

  openCreateTransaction() {
    const matDialogRef = this._dialog.open(TransactionFormComponent, {
      data: {
        title: 'Create Transaction'
      },
    });
    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getTransactions();
      }
    });
  }

  openUpdateTransaction(data: ITransaction) {
    const matDialogRef = this._dialog.open(TransactionFormComponent, {
      data: {
        title: 'Update Transaction',
        transaction: data,
      },
    });

    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getTransactions();
      }
    });
  }

  searchTransaction(): void {
    this.loading = true;
    this._transactionService.searchTransaction(this.page, this.pageSize,this.for,this.startDate, this.endDate).subscribe({
      next: (data) => {
        this.searched = true;
        this.loading = false;
        const resdata = data.data as PagedData<ITransaction>;
        this.dataSource = resdata.data!;
        this.totalRows = resdata.totalRows;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      },
    })
  }

  openDeleteArticle(data: ITransaction) {
    const matDialogRef = this._dialog.open(TransactionDeleteComponent, {
      data: {
        _id: data._id,
      },
    });

    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getTransactions();
      }
    });
  }
  exportTransactions():void{
    this.loading = true;
    this._transactionService.exportTransactions(this.searched,this.for,this.startDate, this.endDate).subscribe((data:any)=>{
      this.loading = false;
      let url = window.URL.createObjectURL(data);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = "Transactions.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    })
  }
  onPageChange(e:PageEvent):void{
    this.page = e.pageIndex+1;
    this.pageSize = e.pageSize;
    if(this.searched)
      this.searchTransaction();
    else
      this.getTransactions();
  }
  clearSearch():void{
    this.startDate=undefined;
    this.endDate=undefined;
    this.for ="";
    this.searched=false;
    this.getTransactions();
  }
  getUsers(users:any):string{
    return users.map((user:any)=>{
      if(typeof user =="object")
        return user.username
      return "";
      }).join(", ")
  }
}
