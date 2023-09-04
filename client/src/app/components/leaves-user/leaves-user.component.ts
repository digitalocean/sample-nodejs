import { PageEvent } from '@angular/material/paginator';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LeaveService } from 'src/app/services/leave.service';
import { ILeave, LeaveType, PagedData } from 'src/app/shared/types';
import { CreateLeaveComponent } from '../leave-create/leave-create.component';
import { LeaveDeleteComponent } from '../leave-delete/leave-delete.component';

@Component({
  selector: 'app-leaves-user',
  templateUrl: './leaves-user.component.html',
  styleUrls: ['./leaves-user.component.scss'],
})
export class LeavesUserComponent implements OnInit {
  loading: boolean = false;
  totalRows: number = 0;
  page: number = 1;
  pageSize: number = 10;
  displayedColumns: string[] = [
    '#',
    'Username',
    'Date of Leave',
    'Leave Type',
    'Reason',
    'Approval Status'
  ];
  dataSource: any[] = [];

  constructor(private _dialog: MatDialog, private _leaveService: LeaveService) {
    this.getAllLeaves();
  }

  ngOnInit(): void { }


  getAllLeaves(): void {
    this.loading = true;
    this._leaveService.getAllLeaves(this.page, this.pageSize, true).subscribe({
      next: (data) => {
        this.loading = false;
        const resdata = data.data as PagedData<ILeave>;
        this.dataSource = resdata.data as ILeave[];
        this.totalRows = resdata.totalRows;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    })
  }

  openCreateLeave(): void {
    const editdata: ILeave = {
      dateOfLeave: undefined,
      reason: "",
      type:LeaveType.FULLDAY,
    }
    const dialogRef = this._dialog.open(CreateLeaveComponent, {
      data: {
        updateLeave: false,
        title: 'Create Leave',
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getAllLeaves();
      }
    });
  }

  editLeave(editdata: ILeave): void {
    const dialogRef = this._dialog.open(CreateLeaveComponent, {
      data: {
        updateLeave: true,
        title: 'Update Leave',
        leave: editdata,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getAllLeaves();
      }
    });
  }
  deleteLeave(data: ILeave): void {
    const matDialogRef = this._dialog.open(LeaveDeleteComponent, {
      data: {
        _id: data._id,
      },
    });

    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getAllLeaves();
      }
    });
  }
  exportLeaves(): void {
    this.loading = true;
    this._leaveService.exportLeaves(true).subscribe((data: any) => {
      this.loading = false;
      let url = window.URL.createObjectURL(data);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = "MyLeaves.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    })
  }
  onPageChange(e: PageEvent): void {
    this.page = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.getAllLeaves();
  }
}
