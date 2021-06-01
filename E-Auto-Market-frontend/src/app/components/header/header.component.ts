import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any = {};

  constructor(
    private router: Router
  ) {
    const user = sessionStorage.getItem('user');
    this.user = JSON.parse(user);
  }

  ngOnInit(): void {
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  goBack(): void {
    history.back();
  }

  goHome(): void {
    if (this.user.roles === 1) {
      this.router.navigate(['/list']);
    } else {
      this.router.navigate(['/seller']);
    }
  }
}
