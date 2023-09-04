import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-leave-approve',
  templateUrl: './leave-approve.component.html',
  styleUrls: ['./leave-approve.component.scss']
})
export class LeaveApproveComponent implements OnInit {

  constructor(private _leaveService: LeaveService, private _snackBar: MatSnackBar, private _dialog: MatDialogRef<LeaveApproveComponent>, @Inject(MAT_DIALOG_DATA) public data: { _id: string }) {
  }

  ngOnInit(): void {
  }

  approveLeave(): void {
    this._leaveService.approveLeave(this.data._id, true).subscribe({
      next: (data) => {
        this._snackBar.open('Leave Approved', "", {
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
