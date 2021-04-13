import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Redirect } from '../../../services/redirect.service';
@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  profile;
  id;
  flag = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: Redirect
  ) {
    this.http
      .get(environment.API_BASE_V1 + '/get-profile')
      .subscribe((data: any) => {
        this.flag = true;
        this.profile = data;
        this.id = data._id;
      });
  }

  logout() {
    this.http
      .post(environment.API_BASE_V1 + '/logout', { id: this.id })
      .subscribe((data: any) => {
        this.auth.doLogout();
      });
  }
}
