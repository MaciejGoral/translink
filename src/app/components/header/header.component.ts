import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  username: string = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('user') != null;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = localStorage.getItem('user') != null;
        if (this.isLoggedIn) {
          this.username = JSON.parse(localStorage.getItem('user')).username;
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
