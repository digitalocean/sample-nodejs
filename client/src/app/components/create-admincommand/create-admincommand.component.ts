import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminCommandService } from 'src/app/services/admin-command.service';
import { IAdminCommand} from 'src/app/shared/types';

@Component({
  selector: 'app-create-admincommand',
  templateUrl: './create-admincommand.component.html',
  styleUrls: ['./create-admincommand.component.scss']
})
export class CreateAdminCommandComponent implements OnInit {
  formData: IAdminCommand = {
    admincommand: "",
    active:true,
  }

  hide: boolean = true;  
  update: boolean = false;
  constructor(private _admincommandService: AdminCommandService, private _snackBar: MatSnackBar, private _matDialogRef: MatDialogRef<CreateAdminCommandComponent>,@Inject(MAT_DIALOG_DATA) public data: { updateAdminCommand: boolean, title: string, admincommand: IAdminCommand}) { 
    if(this.data.updateAdminCommand) {
      this.formData = this.data.admincommand;
    }
  }

  ngOnInit(): void {
  }

  onSave(): void { 
    this._admincommandService.saveAdminCommand(this.formData).subscribe({
      next: (data) => {
        this._snackBar.open("Admin command saved successfully.", "", {
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
  updateAdminCommand():void {
    this._admincommandService.updateAdminCommand(this.formData, this.data.admincommand._id!).subscribe({
      next: (data) => {
        this._snackBar.open("AdminCommand updated successfully.", "", {
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
