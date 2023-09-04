import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-announcement-delete',
  templateUrl: './announcement-delete.component.html',
  styleUrls: ['./announcement-delete.component.scss']
})
export class AnnouncementDeleteComponent implements OnInit {

  constructor(private _announcementService: AnnouncementService, private _snackBar: MatSnackBar, private _dialog: MatDialogRef<AnnouncementDeleteComponent>,@Inject(MAT_DIALOG_DATA) public data: { _id: string }) {
  }

  ngOnInit(): void {
  }

  deleteAnnouncement(): void {
    this._announcementService.deleteAnnouncement(this.data._id).subscribe({
      next: (data) => {
        this._snackBar.open('Announcement Deleted', "", {
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
