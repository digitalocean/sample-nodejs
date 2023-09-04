import { PageEvent } from '@angular/material/paginator';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { IAnnouncement, PagedData } from 'src/app/shared/types';
import { CreateAnnouncementComponent } from '../announcement-create/announcement-create.component';
import { AnnouncementDeleteComponent } from '../announcement-delete/announcement-delete.component';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
})
export class AnnouncementsComponent implements OnInit {
  loading: boolean = false;
  totalRows:number=0;
  page:number = 1;
  pageSize:number=10;
  displayedColumns: string[] = [
    '#',
    'Announcement',
  ];
  dataSource: IAnnouncement[] = [];

  constructor(private _dialog: MatDialog, private _announcementService: AnnouncementService) {
    this.getAllAnnouncements();
  }

  ngOnInit(): void {}


  getAllAnnouncements(): void {
    this.loading = true;
    this._announcementService.getAllAnnouncements(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.loading = false;
        const resdata = data.data as PagedData<IAnnouncement>;
        this.dataSource = resdata.data as IAnnouncement[];
        this.totalRows = resdata.totalRows;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    })
  }

  openCreateAnnouncement(): void {
    const editdata :IAnnouncement = {
      announcement: "",
      active:false,
    }
    const dialogRef = this._dialog.open(CreateAnnouncementComponent,{
      data: {
        updateAnnouncement: false,
        title: 'Create Announcement',
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getAllAnnouncements();
      }
    });
  }

  editAnnouncement(editdata:IAnnouncement): void {
    const dialogRef = this._dialog.open(CreateAnnouncementComponent,{
      data: {
        updateAnnouncement: true,
        title: 'Update Announcement',
        announcement: editdata,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getAllAnnouncements();
      }
    });
  }
  deleteAnnouncement(data:IAnnouncement): void {
    const matDialogRef = this._dialog.open(AnnouncementDeleteComponent, {
      data: {
        _id: data._id,
      },
    });

    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getAllAnnouncements();
      }
    });
  }
  exportAnnouncements():void{
    this.loading = true;
    this._announcementService.exportAnnouncements().subscribe((data:any)=>{
      this.loading = false;
      let url = window.URL.createObjectURL(data);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = "Announcements.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    })
  }
  onPageChange(e:PageEvent):void{
    this.page = e.pageIndex+1;
    this.pageSize = e.pageSize;
    this.getAllAnnouncements();
  }
}
