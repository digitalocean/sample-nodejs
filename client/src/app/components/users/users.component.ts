import { PageEvent } from '@angular/material/paginator';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { IUser, UserType,PagedData } from 'src/app/shared/types';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  loading: boolean = false;
  totalRows:number=0;
  page:number = 1;
  pageSize:number=10;
  searched:boolean = false;
  employeename:string="";
  displayedColumns: string[] = [
    '#',
    'Username',
    'Name',    
    'ID',
    'User Type',
    'Mobile',
    'Address',
    'Email',
    'Contact Person',
    'Contact Person Mobile',
    'Joining Date',
  ];
  dataSource: IUser[] = [];

  constructor(private _dialog: MatDialog, private _userService: UserService) {
    this.getAllUsers();
  }

  ngOnInit(): void {}


  getAllUsers(): void {
    this.loading = true;
    this._userService.getAllUsers(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.loading = false;
        const resdata = data.data as PagedData<IUser>;
        this.dataSource = resdata.data as IUser[];
        this.totalRows = resdata.totalRows;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    })
  }

  openCreateUser(): void {
    const editdata :IUser = {
      username: "",
      employeeId: "",
      contactPerson: {
        //email: "",
        mobileNo: "",
        name: ""
      },
      email: "",
      mobileNo: "",
      password: "",
      type: UserType.EMP,
      name: "",
      address: "",
      _id:"",
      joiningDate:undefined
    }
    const dialogRef = this._dialog.open(CreateUserComponent,{
      data: {
        updateUser: false,
        title: 'Create User',
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getAllUsers();
      }
    });
  }

  editUser(editdata:IUser): void {
    const dialogRef = this._dialog.open(CreateUserComponent,{
      data: {
        updateUser: true,
        title: 'Update User',
        user: editdata,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getAllUsers();
      }
    });
  }
  deleteUser(data:IUser): void {
    const matDialogRef = this._dialog.open(UserDeleteComponent, {
      data: {
        _id: data._id,
      },
    });

    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getAllUsers();
      }
    });
  }
  exportUsers():void{
    this.loading = true;
    this._userService.exportUsers(true,this.employeename).subscribe((data:any)=>{
      this.loading = false;
      let url = window.URL.createObjectURL(data);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = "Users.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    })
    // this._userService.exportUsers().subscribe({
    //   next: (data) => {
    //     this.loading = false;
    //     debugger
    //   },
    //   error: (err) => {
    //     debugger
    //     this.loading = false;
    //     console.error(err);
    //   }
    // })
  }
  onPageChange(e:PageEvent):void{
    this.page = e.pageIndex+1;
    this.pageSize = e.pageSize;
    this.getAllUsers();
  }

  searchUsers():void{
    this.loading = true;
    this._userService.searchUser(this.page, this.pageSize,this.employeename).subscribe({
      next: (data) => {
        this.searched = true;
        this.loading = false;
        const resdata = data.data as PagedData<IUser>;
        this.dataSource = resdata.data!;
        this.totalRows = resdata.totalRows;  
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      },
    })
  }
  clearSearch():void{
    this.employeename="";
    this.searched=false;
    this.getAllUsers();
  }
}
