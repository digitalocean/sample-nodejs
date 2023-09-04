import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  loading: boolean = false;

  hide: boolean = true;

  confirmpassword: string = '';
  password: string = '';

  errorMessage: string = '';


  constructor() { }

  ngOnInit(): void {
  }

}
