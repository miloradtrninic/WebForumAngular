import { Component, OnInit } from '@angular/core';
import {UserService} from 'app/services/user.service';
import {UserModel} from '../../model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userLogged: UserModel;
  constructor( private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser(this.userService.loggedUserToken.username).subscribe(
      (userLogged) => this.userLogged = userLogged,
      (error) => console.log(error)
    );
  }

}
