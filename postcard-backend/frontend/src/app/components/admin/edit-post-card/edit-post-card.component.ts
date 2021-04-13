import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'edit-post-card.',
  templateUrl: './edit-post-card.component.html',
  styleUrls: ['./edit-post-card.component.css'],
})
export class EditPostCardComponent {
  params;
  postCard;
  public editPostCardForm: FormGroup;
  response: any;
  status = false;
  _id;
  constructor(
    private router: Router,
    private frmbuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((prams) => {
      this.params = prams;
      console.log(this.params);

      this.http
        .get<any>(
          environment.API_BASE_V1 + '/get-post-card-by-id/' + this.params.id
        )
        .subscribe((data) => {
          if (data) {
            this.status = true;
            this.postCard = data;
            this._id = data._id;
          }
        });
    });
    this.editPostCardForm = frmbuilder.group({
      postcard: new FormControl(),
    });
  }

  editCard(editPostCardForm: any) {
    console.log(this._id);
    console.log(this.editPostCardForm.value);
    this.http
      .post<any>(environment.API_BASE_V1 + '/update-post-card', {
        form: this.editPostCardForm.value,
        id: this._id,
      })
      .subscribe(
        (data) => {
          if ((data.message = 'sucess')) {
            this.router.navigateByUrl('admin/text-post-card');
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
