import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LogInFormComponent } from './components/login/login.component';
import { SignUpFormComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { TextPostCardComponent } from './components/admin/text-post-card/text.component';
import { EditPostCardComponent } from './components/admin/edit-post-card/edit-post-card.component';
import { TextPostCardDialogComponent } from './components/admin/text-postcard-diaglog/textpostcard.component';
@NgModule({
  declarations: [
    AppComponent,
    LogInFormComponent,
    DashboardComponent,
    SignUpFormComponent,
    TextPostCardDialogComponent,
    TextPostCardComponent,
    EditPostCardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
