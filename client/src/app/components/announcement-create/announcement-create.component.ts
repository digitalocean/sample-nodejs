import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { IAnnouncement, Status } from 'src/app/shared/types';

@Component({
  selector: 'app-announcement-create',
  templateUrl: './announcement-create.component.html',
  styleUrls: ['./announcement-create.component.scss']
})
export class CreateAnnouncementComponent implements OnInit {
  formData: IAnnouncement = {
    announcement: "",
    _id:"",
    active:true,
  }

  hide: boolean = true;  
  update: boolean = false;
  profile:boolean=false;
  constructor(private _announcementService: AnnouncementService, private _snackBar: MatSnackBar, private _matDialogRef: MatDialogRef<CreateAnnouncementComponent>,@Inject(MAT_DIALOG_DATA) public data: { updateAnnouncement: boolean, title: string, status: Status, announcement: IAnnouncement,profile:boolean}) { 
    this.update=this.data.updateAnnouncement;
    if(this.data.updateAnnouncement) {
      this.formData = this.data.announcement;
    }
    this.profile = this.data.profile;
  }

  ngOnInit(): void {
  }

  onSave(): void { 
    this._announcementService.saveAnnouncement(this.formData).subscribe({
      next: (data) => {
        this._snackBar.open("Announcement created successfully.", "", {
          duration: 3000,
        });
        this._matDialogRef.close(true);
      },
      error: (err) => {
        let errorMsg :string[] = [];       
        if(Array.isArray(err?.error?.error)){
          err?.error?.error.forEach((errrr:any) => {
              errorMsg.push(errrr?.error)
          });
          this._snackBar.open(errorMsg.join(","), "OK");
        }
        else{
          this._snackBar.open(err?.error?.error, "OK");
        }   
      }
    })
  }
  updateAnnouncement():void {
    this._announcementService.updateAnnouncement(this.formData, this.data.announcement._id!).subscribe({
      next: (data) => {
        this._snackBar.open("Announcement updated successfully.", "", {
          duration: 3000,
        });
        this._matDialogRef.close(true);
      },
      error: (err) => {
        let errorMsg :string[] = [];       
        if(Array.isArray(err?.error)){
          err?.error.forEach((errrr:any) => {
              errorMsg.push(errrr?.error)
          });
          this._snackBar.open(errorMsg.join(","), "OK");
        }
        else{
          this._snackBar.open(err?.error?.error, "OK");
        }       
      }
    })
  }
}
