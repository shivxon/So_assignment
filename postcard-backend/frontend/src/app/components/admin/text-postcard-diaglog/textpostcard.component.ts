import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { LocalStorage } from '../../../services/localStorage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';
@Component({
  selector: 'admin-textpostcard',
  templateUrl: './textpostcard.component.html',
  styleUrls: ['./textpostcard.component.css'],
})
export class TextPostCardDialogComponent {
  headerDict = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  public PostCardForm: FormGroup;
  isVisible = 'is-visible';
  constructor(private frmbuilder: FormBuilder, private http: HttpClient) {
    this.PostCardForm = frmbuilder.group({
      postcard: ['', Validators.compose([Validators.required])],
    });
  }
  ngOnInit() {}
  // fileEvent(fileInput: any) {
  //   const AWSService = AWS;
  //   const region = 'us-east-1';
  //   const bucketName = 'example-bucket-vashishtha';
  //   const IdentityPoolId = 'us-east-1:f3c20bb6-ad1e-49dd-bf9b-a3e3dc6880b2';
  //   const file = fileInput.target.files[0];
  //   //Configures the AWS service and initial authorization
  //   AWSService.config.update({
  //     region: region,
  //     credentials: new AWSService.CognitoIdentityCredentials({
  //       IdentityPoolId: IdentityPoolId,
  //     }),
  //   });
  //   //adds the S3 service, make sure the api version and bucket are correct
  //   const s3 = new S3({
  //     apiVersion: '2006-03-01',
  //     params: { Bucket: bucketName },
  //   });
  //   //I store this in a variable for retrieval later
  //   //this.image = file.name;
  //   var obj = s3.upload(
  //     { Key: file.name, Bucket: bucketName, Body: file, ACL: 'public-read' },
  //     function (err, data) {
  //       if (err) {
  //         console.log(err, 'there was an error uploading your file');
  //       }
  //       console.log(data);
  //       this.DocumentLocation = data.Location;
  //     }
  //   );

  //   this.DocumentObject = obj;
  // }
  savePostCard(PostCardForm: any) {
    this.http
      .post<any>(
        environment.API_BASE_V1 + '/add-post-card',
        this.PostCardForm.value
      )
      .subscribe((data) => {
        if ((data.message = 'succces')) {
          this.closepopup();
          window.location.reload();
        }
      });
  }
  closepopup() {
    document.getElementById('modal1').classList.remove(this.isVisible);
    document.addEventListener('keyup', (e) => {
      // if we press the ESC
      if (e.key == 'Escape' && document.querySelector('.modal.is-visible')) {
        document
          .querySelector('.modal.is-visible')
          .classList.remove(this.isVisible);
      }
    });
    document.addEventListener('click', (e) => {
      if (e.target == document.querySelector('.modal.is-visible')) {
        document
          .querySelector('.modal.is-visible')
          .classList.remove(this.isVisible);
      }
    });
  }
}
