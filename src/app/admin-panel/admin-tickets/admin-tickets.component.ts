import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-admin-tickets',
  templateUrl: './admin-tickets.component.html',
  styleUrls: ['./admin-tickets.component.css']
})
export class AdminTicketsComponent implements OnInit {
  activeChild: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.filter(evt => evt instanceof NavigationEnd)
      .map((evt: NavigationEnd) => evt.url)
      .subscribe(url => {
          this.activeChild = url.substr(url.lastIndexOf('/') + 1);
        }
      );
  }

}
