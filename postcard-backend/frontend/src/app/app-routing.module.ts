import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService as AdminGuard } from '../app/guard/adminGuard.service';
import { LogInFormComponent } from './components/login/login.component';
import { SignUpFormComponent } from './components/signup/signup.component';
import { TextPostCardComponent } from './components/admin/text-post-card/text.component';
import { EditPostCardComponent } from './components/admin/edit-post-card/edit-post-card.component';
import { NotFound } from './components/404/error.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SignUpFormComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LogInFormComponent,
  },
  {
    path: 'admin/dashboard',
    redirectTo: '/admin/text-post-card',
  },
  {
    path: 'admin/text-post-card',
    canActivate: [AdminGuard],
    pathMatch: 'full',
    component: TextPostCardComponent,
  },
  {
    path: 'admin/edit-post-card/:id',
    canActivate: [AdminGuard],
    pathMatch: 'full',
    component: EditPostCardComponent,
  },
  {
    path: 'page-not-found',
    component: NotFound,
  },
  {
    path: '**',
    redirectTo: '/page-not-found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
  providers: [AdminGuard],
})
export class AppRoutingModule {}
