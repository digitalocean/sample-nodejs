import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private _authService: AuthService, private _dialogRef: MatDialogRef<LogoutComponent>, private _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this._authService.logout().subscribe({
      next: (data) => {
        localStorage.clear();
        this._dialogRef.close();
        this._snackBar.open("Logged out successfully", "", {
          duration: 3000
        });
        this._router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
