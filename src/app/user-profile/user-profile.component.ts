import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
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
