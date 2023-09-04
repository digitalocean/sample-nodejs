import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AdminCommandService } from 'src/app/services/admin-command.service';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';
import IArticle, { FilterStatus, IAdminCommand, IUser, PagedData } from 'src/app/shared/types';
import { ArticleCloseComponent } from '../article-close/article-close.component';
import { ArticleDeleteComponent } from '../article-delete/article-delete.component';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { ArticleImportComponent } from '../article-import/article-import.component';
import { CreateAdminCommandComponent } from '../create-admincommand/create-admincommand.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  admincommands: IAdminCommand[] = [];
  startDate?: Date = undefined;
  endDate?: Date = undefined;
  searched: boolean = false;
  statusOptions = Object.keys(FilterStatus);
  status: FilterStatus = FilterStatus.ALL;
  client: string = "";
  totalRows: number = 0;
  page: number = 1;
  pageSize: number = 10;
  assignedTo?: string = undefined;
  users: IUser[] | null = [];
  displayedColumns: string[] = [
    '#',
    'Client',
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
    'User Status',
    'Created Date',
    'Target Date',
    // 'Last Updated',
    'Completed Date',
    'User Completed Date',
    "Admin Command",
    'Closed Date',
    'Completed By time'
  ];
  dataSource: IArticle[] = [];

  loading: boolean = false;

  constructor(
    private _articleService: ArticleService,
    private _matDialog: MatDialog,
    private _userService: UserService,
    private _admincommandService: AdminCommandService
  ) {
    this.getArticles();
    this.getAdminCommand();
  }
  getHours(from: any, to: any): string {
    if (from && to) {
      const diffInMs = Date.parse(to) - Date.parse(from);
      const diffInHours = diffInMs / 1000;
      return this.secondsToHMS(Math.round(diffInHours));
    }
    return "";
  }
  secondsToHMS(d: number): string {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ('0' + h).slice(-2) + ':' + ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
  }
  getArticles(): void {
    this.loading = true;
    this._articleService.getAllArticle(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.loading = false;
        const resdata = data.data as PagedData<IArticle>;
        this.dataSource = resdata.data!;
        this.totalRows = resdata.totalRows;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      },
    });
  }

  openCreateArticle() {
    const matDialogRef = this._matDialog.open(ArticleFormComponent, {
      data: {
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
  searchArticle(): void {
    this.loading = true;
    this._articleService.searchArticle(this.page, this.pageSize, this.status, this.client, false, "", this.startDate, this.endDate, this.assignedTo).subscribe({
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

  ngOnInit(): void {
    this._userService.getNonAdmin().subscribe({
      next: (data) => {
        if (data.success) {
          this.users = data.data;
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  exportDashboard(): void {
    this.loading = true;
    this._articleService.exportDashboard(this.searched, this.status, this.client, false, "", this.startDate, this.endDate, this.assignedTo).subscribe((data: any) => {
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
  importDashboard(): void {
    const matDialogRef = this._matDialog.open(ArticleImportComponent, {
      data: { isAdmin: true },
    });

    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (this.searched)
          this.searchArticle();
        else
          this.getArticles();
      }
    });
  }
  onPageChange(e: PageEvent): void {
    this.page = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    if (this.searched)
      this.searchArticle();
    else
      this.getArticles();
  }

  ShowAdminCommand(): void {
    let data: any = {};
    debugger;
    data.updateAdminCommand = this.admincommands.length > 0;
    if (this.admincommands.length > 0) {
      data.admincommand = this.admincommands[0]
    }
    const matDialogRef = this._matDialog.open(CreateAdminCommandComponent, {
      data: data,
    });

    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getAdminCommand();
      }
    });
  }
  getAdminCommand(): void {
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
  clearSearch(): void {
    this.status = FilterStatus.ALL;
    this.client = "";
    this.startDate = undefined;
    this.endDate = undefined;
    this.assignedTo = undefined;
    this.searched = false;
    this.getArticles();
  }
}
