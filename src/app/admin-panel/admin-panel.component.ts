import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {UserModel} from '../model/user.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
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
