import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserModel} from '../model/user.model';
import {UserService} from '../services/user.service';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  userReg: UserModel;
  errorMsg: string;
  errorSet: boolean;
  constructor(private userService: UserService, private datepipe: DatePipe, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    const user = new UserModel(this.signupForm.value.username, this.signupForm.value.password);
    user.name = this.signupForm.value.name;
    user.surname = this.signupForm.value.lastname;
    user.phoneNum = this.signupForm.value.phone;
    const today = new Date();
    user.registerDate = this.datepipe.transform(today, 'dd-MM-yy');
    user.role = 'SUBSCRIBER';
    user.email = this.signupForm.value.email;
    user.myComments = [];
    user.myThreads = [];
    user.subscribedSections = [];
    this.userService.register(user)
      .subscribe(
        (userResp) => {
          this.userReg = userResp;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        (error) => {this.errorMsg = error; this.errorSet = true; }
      )
  }

}
