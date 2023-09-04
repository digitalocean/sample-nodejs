import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from 'src/app/services/article.service';
import IArticle, {FilterStatus,IAdminCommand,IUser,PagedData} from 'src/app/shared/types';
import { ArticleDeleteComponent } from '../article-delete/article-delete.component';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { AuthService } from 'src/app/services/auth.service';
import { ArticleImportComponent } from '../article-import/article-import.component';
import { PageEvent } from '@angular/material/paginator';
import { AdminCommandService } from 'src/app/services/admin-command.service';
import { ArticleCloseComponent } from '../article-close/article-close.component';

@Component({
  selector: 'app-non-admin-dashboard',
  templateUrl: './non-admin-dashboard.component.html',
  styleUrls: ['./non-admin-dashboard.component.scss']
})
export class NonAdminDashboardComponent implements OnInit {  
  admincommands:IAdminCommand[]=[];
  startDate?: Date = undefined;
  endDate?: Date = undefined;
  searched:boolean = false;
  statusOptions = Object.keys(FilterStatus);
  status: FilterStatus = FilterStatus.ALL;
  batch:string = "";
  totalRows:number=0;
  page:number = 1;
  pageSize:number=10;
  displayedColumns: string[] = [
    '#',
    'Batch/JOB ID',
    // 'Article Type',
    'Article/ISBN',
    'Pages',
    'Input Type',
    'Complexity',
    'Process Type',
    'Math Count',
    'Images Count',
    'Assigned To',
    'Status',    
    'Received Date',
    'Target Date',
    'User Completed Date',
    //'Last Updated',
    'Completed Date',
    
    //'Closed Date',
    "Admin Command",
  ];
  dataSource: IArticle[] = [];

  loading: boolean = false;

  constructor(
    private _authService: AuthService,
    private _articleService: ArticleService,
    private _matDialog: MatDialog,
    private _admincommandService:AdminCommandService
  ) {
    this.getArticles();
    this.getAdminCommand();
  }
  
  getArticles(): void {
    const userLoggedin: IUser | null = this._authService.getLoggedInUser();
    this.loading = true;
    if(userLoggedin) {
      this._articleService.getAllArticle(this.page, this.pageSize,true).subscribe({
        next: (data) => {
          this.loading = false;
          const resdata = data.data as PagedData<IArticle>;
          this.dataSource = resdata.data as IArticle[];
          this.totalRows = resdata.totalRows;
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        },
      });
    }    
  }

  openCreateArticle() {
    const matDialogRef = this._matDialog.open(ArticleFormComponent, {
      data: {
        fromNonAdmin: true,
        updateArticle: false,
        title: 'Create Article',
      },
    });
    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getArticles();
      }
    });
  }

  openUpdateArticle(data: IArticle) {
    const matDialogRef = this._matDialog.open(ArticleFormComponent, {
      data: {
        fromNonAdmin: true,
        updateArticle: true,
        title: 'Update Article',
        status: data.status,
        article: data,
      },
    });

    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getArticles();
      }
    });
  }

  openDeleteArticle(data: IArticle) {
    const matDialogRef = this._matDialog.open(ArticleDeleteComponent, {
      data: {
        _id: data._id,
      },
    });

    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getArticles();
      }
    });
  }

  searchArticle(): void {
    this.loading = true;
    this._articleService.searchArticle(this.page, this.pageSize,this.status,"",true,this.batch,this.startDate, this.endDate).subscribe({
      next: (data) => {
        this.searched = true;
        this.loading = false;
        const resdata = data.data as PagedData<IArticle>;
        this.dataSource = resdata.data!;
        this.totalRows = resdata.totalRows;  
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      },
    })
  }

  ngOnInit(): void {}

  exportDashboard():void{
    this.loading = true;
    this._articleService.exportDashboard(this.searched,this.status,"",true,this.batch,this.startDate, this.endDate).subscribe((data:any)=>{
      this.loading = false;
      let url = window.URL.createObjectURL(data);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = "Dasboard.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    })
  }
  importDashboard():void{
    const matDialogRef = this._matDialog.open(ArticleImportComponent, {
      data: {isAdmin:false},
    });

    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getArticles();
      }
    });
  }
  onPageChange(e:PageEvent):void{
    this.page = e.pageIndex+1;
    this.pageSize = e.pageSize;
    if(this.searched)
      this.searchArticle();
    else
      this.getArticles();
  }
  getAdminCommand():void{
    this.loading = true;
    this._admincommandService.getAllAdminCommands().subscribe({
      next: (data) => {
        this.loading = false;
        const resdata = data.data as PagedData<IAdminCommand>;
        this.admincommands = resdata.data;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      },
    });
  }
  clearSearch():void{
    this.batch="";
    this.status = FilterStatus.ALL;
    this.startDate=undefined; 
    this.endDate=undefined;
    this.searched=false;
    this.getArticles();
  }
  openCloseArticle(data: IArticle) {
    const matDialogRef = this._matDialog.open(ArticleCloseComponent, {
      data: {
        _id: data._id,
      },
    });

    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getArticles();
      }
    });
  }
}
