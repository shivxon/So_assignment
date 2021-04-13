import { Injectable } from '@angular/core';
import { LocalStorage } from '../services/localStorage.service';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Redirect {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(
    private localStorageService: LocalStorage,
    private router: Router
  ) {}

  redirect(result: any) {
    if (result && result.role == 'User') {
      this.localStorageService.setStorage('user', {
        role: result.role,
        email: result.email,
        token: result.token,
      });
      this.router.navigateByUrl('admin/dashboard');
    } else {
      this.router.navigateByUrl('/');
    }
  }
  getToken() {
    return this.localStorageService.getValueByKey('user');
  }

  doLogout() {
    let removeToken = this.localStorageService.clear();
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
}
