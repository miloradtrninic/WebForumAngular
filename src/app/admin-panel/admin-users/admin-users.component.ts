import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../model/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  userList: UserModel[];
  error: boolean;
  success: boolean;
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.userService.getUsers().subscribe(
      (users) => this.userList = users,
      (error) => console.log(error)
    );
  }

  updateUser(user: UserModel) {
    this.userService.update(user).subscribe(
      (userret) => {this.success = true},
      (error) => {this.error = true}
    );
  }

}
