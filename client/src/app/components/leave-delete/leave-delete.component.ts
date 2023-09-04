import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-leave-delete',
  templateUrl: './leave-delete.component.html',
  styleUrls: ['./leave-delete.component.scss']
})
export class LeaveDeleteComponent implements OnInit {

  constructor(private _leaveService: LeaveService, private _snackBar: MatSnackBar, private _dialog: MatDialogRef<LeaveDeleteComponent>,@Inject(MAT_DIALOG_DATA) public data: { _id: string }) {
  }

  ngOnInit(): void {
  }

  deleteLeave(): void {
    this._leaveService.deleteLeave(this.data._id).subscribe({
      next: (data) => {
        this._snackBar.open('Leave Deleted', "", {
          duration: 3000
        });
        this._dialog.close(true);
      },
      error: (err) => {
        if(err && err.error && err.error.statusCode==400){
          this._snackBar.open(err.error.error, "", {
            duration: 3000
          });
          this._dialog.close(true);
        }        
      }
    });
  }
}
