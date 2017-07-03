import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {UserModel} from '../model/user.model';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Token} from '../model/token.model';


@Component ({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  errorSet = false;
  @ViewChild('f') formLogin: NgForm;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    const user = new UserModel(this.formLogin.value.username, this.formLogin.value.password);
    this.userService.login(user).subscribe(
      (success: Token) => {
        this.userService.storeToken();
        this.router.navigate(['/']);
      },
      (error) => { this.errorSet = true}
    );
    this.errorMessage = this.userService.errorMessage;


    // this.userService.login(user).subscribe(
    //   (userRet) => {
    //     this.userService.loggedUser = userRet;
    //     this.router.navigate(['/']);
    //   },
    //   (errorMsg) => {
    //     this.errorMessage = errorMsg;
    //     this.errorSet = true;
    //
    //   }
    // );
  }
}
