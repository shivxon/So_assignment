import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LocalStorage } from '../services/localStorage.service';

@Injectable()
export class NotUser implements CanActivate {
  constructor(
    public localStorageService: LocalStorage,
    public router: Router
  ) {}

  canActivate(): boolean {
    const user = this.localStorageService.getValueByKey('user');
    //debugger
    if (user === undefined || user === null) {
      return true;
    } else {
      if (user && user.role === 'Admin') {
        this.router.navigateByUrl('/admin/dasboard');
        return true;
      } else if (user && user.role === 'Employer') {
        this.router.navigateByUrl('employer/users/:page');
        return true;
      }
      return false;
    }
  }
}
