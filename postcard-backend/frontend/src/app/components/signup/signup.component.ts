import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../validations/customValidation';
import { ApiService } from './api.service';
import { Redirect } from '../../services/redirect.service';

@Component({
  selector: 'signup-form',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignUpFormComponent {
  public signupForm: FormGroup;
  response: any;
  error: any = false;
  message: any;

  constructor(
    private router: Router,
    private frmbuilder: FormBuilder,
    private api: ApiService,
    private redirect: Redirect
  ) {
    this.signupForm = frmbuilder.group({
      fullName: [''],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          // check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true,
          }),
          // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, {
            hasCapitalCase: true,
          }),
          // check whether the entered password has a lower case letter
          CustomValidators.patternValidator(/[a-z]/, {
            hasSmallCase: true,
          }),
          // check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true,
            }
          ),
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      ],
    });
  }
  register(signupForm: any) {
    this.api.signup(this.signupForm.value).subscribe(
      (result: any) => {
        this.router.navigate(['login']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
