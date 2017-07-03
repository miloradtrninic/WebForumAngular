import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
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
