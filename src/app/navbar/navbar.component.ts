import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  account: any;
  logout: any;
  constructor( private router: Router  ) { 
    this.account = false;
    this.logout = false;
  }

  async ngOnInit() {
    this.account = false || localStorage.getItem('user');
    this.logout = false || localStorage.getItem('user');
  }
  onClickMe() {
    localStorage.clear();
    this.router.navigateByUrl('/accueil')

  }
}
