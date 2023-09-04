import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-delete',
  templateUrl: './transaction-delete.component.html',
  styleUrls: ['./transaction-delete.component.scss']
})
export class TransactionDeleteComponent implements OnInit {

  constructor(private _transactionService: TransactionService, private _snackBar: MatSnackBar, private _dialog: MatDialogRef<TransactionDeleteComponent>,@Inject(MAT_DIALOG_DATA) public data: { _id: string }) { }

  ngOnInit(): void {
  }

  deleteTransaction(): void {
    this._transactionService.deleteArticle(this.data._id).subscribe({
      next: (data) => {
        this._snackBar.open('Transaction Deleted', "", {
          duration: 3000
        });
        this._dialog.close(true);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
