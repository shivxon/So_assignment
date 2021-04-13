import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'not-found',
  template: `
    <div
      style="height:600px; color: #403f4c; text-align: center;pading-top:600px"
    >
      <h2 class="mat-display-1">
        <span style=" color: #ff006d;">404</span><br />Page not found
      </h2>
    </div>
  `,
})
export class NotFound implements OnInit {
  @Input() user: any = {};

  constructor(private router: Router) {}

  ngOnInit() {}

  navigate(link): void {
    this.router.navigate([link]);
  }
}
