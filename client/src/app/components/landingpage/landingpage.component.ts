import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementService } from 'src/app/services/announcement.service';
import IArticle, { IAdminCommand, IAnnouncement, ITransaction, PagedData, UserType } from 'src/app/shared/types';
import {AdminCommandService} from 'src/app/services/admin-command.service';
import { ArticleService } from 'src/app/services/article.service';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
})
export class LandingpageComponent implements OnInit {
  admincommandloading: boolean = false;
  announcementloading:boolean=false;
  myworkloading:boolean=false;
  announcements: IAnnouncement[] = [];
  admincommands:IAdminCommand[]=[];
  mywork:IArticle[]=[];
  startDate?: Date = undefined;
  endDate?: Date = undefined;

  constructor(private _landingpageService: AnnouncementService,
    private _adminCommandService: AdminCommandService,
    private _articleService:ArticleService,
     private _dialog: MatDialog) {
    this.getLandingpage();
  }

  getLandingpage(): void {
    this.announcementloading = true;
    this.admincommandloading = true;
    this.myworkloading = true;
    this._adminCommandService.getAllAdminCommands().subscribe({
      next:(data)=>{
        this.admincommandloading=false;
        const resdata = data.data as PagedData<IAdminCommand>;
        this.admincommands = resdata.data;
      },
      error: (err) => {
        this.admincommandloading = false;
        console.error(err);
      }
    });
    
    this._landingpageService.getAllAnnouncements(1,5).subscribe({
      next: (data) => {
        this.announcementloading = false;
        const resdata = data.data as PagedData<IAnnouncement>;
        this.announcements = resdata.data!;
      },
      error: (err) => {
        this.announcementloading = false;
        console.error(err);
      }
    });
    this._articleService.getMyOpen(true).subscribe({
      next: (data) => {
        this.myworkloading = false;
        const resdata = data.data as IArticle[];
        this.mywork = resdata;
      },
      error: (err) => {
        this.myworkloading = false;
        console.error(err);
      }
    });
  }

  ngOnInit(): void {}
}
