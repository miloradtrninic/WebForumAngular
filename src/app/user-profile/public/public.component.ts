import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../model/user.model';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  username: string;
  user: UserModel;
  error = false;
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.username = params['id'];
          // this.section = this.sectionService.getSection(this.id);
        });
    this.userService.getUser(this.username).subscribe(
      (user) => {this.user = user; this.error = false},
      (error) => this.error = true
    );
  }
}
