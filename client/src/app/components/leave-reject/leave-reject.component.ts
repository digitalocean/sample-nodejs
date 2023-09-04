import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-leave-reject',
  templateUrl: './leave-reject.component.html',
  styleUrls: ['./leave-reject.component.scss']
})
export class LeaveRejectComponent implements OnInit {

  constructor(private _leaveService: LeaveService, private _snackBar: MatSnackBar, private _dialog: MatDialogRef<LeaveRejectComponent>, @Inject(MAT_DIALOG_DATA) public data: { _id: string }) {
  }

  ngOnInit(): void {
  }

  rejectLeave(): void {
    this._leaveService.approveLeave(this.data._id, false).subscribe({
      next: (data) => {
        this._snackBar.open('Leave Rejectd', "", {
          duration: 3000
        });
        this._dialog.close(true);
      },
      error: (err) => {
        if (err && err.error && err.error.statusCode == 400) {
          this._snackBar.open(err.error.error, "", {
            duration: 3000
          });
          this._dialog.close(true);
        }
      }
    });
  }
}
