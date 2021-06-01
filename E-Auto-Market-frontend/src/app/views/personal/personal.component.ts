import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  currentUrl = '';
  user: any = {};

  constructor(
    private router: Router
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        console.log(this.currentUrl);
      }
    });
    const user = sessionStorage.getItem('user');
    this.user = JSON.parse(user);
  }

  ngOnInit(): void {
  }

}
