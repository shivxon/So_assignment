import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './api.sevice';
import { Redirect } from '../../services/redirect.service';

@Component({
  selector: 'signup-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LogInFormComponent {
  public LoginForm: FormGroup;
  response: any;
  error: any = false;
  message: any;

  constructor(
    private router: Router,
    private frmbuilder: FormBuilder,
    private api: ApiService,
    private redirect: Redirect
  ) {
    this.LoginForm = frmbuilder.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  login(LoginForm: any) {
    this.api.login(this.LoginForm.value).subscribe(
      (result) => {
        this.redirect.redirect(result);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
