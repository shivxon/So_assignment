import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
// import * as moment from 'moment';

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
      const space = new RegExp('^(?!\\s*$).+');
      const notspace = space.test(control.value);
      // if true, return no error (no error), else return error passed in the second parameter
      if (notspace) {
        return valid ? null : error;
      } else {
        return error;
      }
    };
  }

  //   static passwordMatchValidator(control: AbstractControl) {
  //     const password: string = control.get('password').value; // get password from our password form control
  //     const confirmPassword: string = control.get('repeatPassword').value; // get password from our confirmPassword form control
  //     // compare is the password math
  //     if (password !== confirmPassword) {
  //       // if they don't match, set an error in our confirmPassword form control
  //       control.get('repeatPassword').setErrors({ NoPassswordMatch: true });
  //     }
  //   }

  //   static dateOfBirthValidator(control: AbstractControl) {
  //     const dateValue = control.get('dateOfBirth').value;

  //     let enterDate = moment(dateValue);
  //     let eighteenYearBackDate = moment().subtract(18, 'years')
  //     let hunderdBackDate =  moment().subtract(100, 'years')

  //     if((enterDate > eighteenYearBackDate) || (enterDate < hunderdBackDate)) {
  //       control.get('dateOfBirth').setErrors({ EighteenYearBackDate: true });
  //     }
  //   }
}
