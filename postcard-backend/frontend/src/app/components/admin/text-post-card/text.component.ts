import { Component, Inject } from '@angular/core';
// import {
//   FormGroup,
//   FormControl,
//   FormBuilder,
//   Validators,
// } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'admin-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
})
export class TextPostCardComponent {
  cardData;
  postData;
  id;
  isVisible = 'is-visible';
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any>(environment.API_BASE_V1 + '/get-post-cards')
      .subscribe((data) => {
        if (data) {
          this.cardData = data;
        }
      });
  }

  editCard(id: any) {
    this.router.navigateByUrl('admin/edit-post-card/' + id);
  }

  deleteCard(id: any) {
    this.http
      .get(environment.API_BASE_V1 + '/delete-post-cards/' + id)
      .subscribe((data: any) => {
        if ((data.message = 'succces')) {
          this.http
            .get(environment.API_BASE_V1 + '/get-post-cards')
            .subscribe((data) => {
              this.cardData = data;
              console.log(data);
            });
        }
      });
  }
  showpopup() {
    document.getElementById('modal1').classList.add(this.isVisible);
  }
}
