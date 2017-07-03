import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx'

import {UserModel} from '../model/user.model';
import {Router} from '@angular/router';
import {Token} from '../model/token.model';
import {DomSanitizer} from '@angular/platform-browser';


@Injectable()
export class UserService {
  baseUrl = 'http://localhost:8080/WebForum/webapi/users/';
  authURL  = 'http://localhost:8080/WebForum/webapi/authentication/';
  updateURL = 'update';
  loginURL = 'login';
  registerURL = 'register';
  headers = new Headers({'Content-Type': 'application/json' });

  loggedUserToken: Token = new Token('', '', '');
  errorMessage: string;

  constructor(private http: Http, private router: Router, private sanitizer: DomSanitizer) {

  }
  getUsers() {
    return this.http.get(this.baseUrl, {headers: this.getJSONAuthHeader()}).map(this.extractDataList).catch(this.handleError);
  }
  getUser(username: string) {
    return this.http.get(this.baseUrl + username, {headers: this.getJSONAuthHeader()}).map(this.extractData).catch(this.handleError);
  }

  update(user: UserModel) {
    return this.http.post(this.baseUrl + this.updateURL, user,
      {headers: this.getJSONAuthHeader()}).map(this.extractData).catch(this.handleError);
  }
  register(user: UserModel) {
    console.log(user);
    return this.http.post(this.baseUrl + this.registerURL, user, {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleErrorLogin);
  }

  login(user: UserModel) {
    const headerForm = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
    const body = `username=${user.username}&password=${user.password}`;
    return this.http.post(this.authURL, body, {headers: headerForm})
      .map(
        (res: Response) => {
          this.loggedUserToken = res.json();
          return this.loggedUserToken;
        }
      )
      .catch(this.handleError);
  }
  logout() {
    this.loggedUserToken = null;
    window.localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
  isLoggedIn(): boolean {
    this.loggedUserToken = JSON.parse(window.localStorage.getItem('currentUser'));
    return this.loggedUserToken != null;
  }
  getRole(): string {
    if (this.isLoggedIn()) {
      return this.loggedUserToken.role;
    }
  }
  storeToken() {
    window.localStorage.setItem('currentUser', JSON.stringify(this.loggedUserToken));
  }
  getJSONAuthHeader(): Headers {
    return new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.loggedUserToken.token});
  }
  getFORMHeader(): Headers {
    return new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
  }
  getAuthHeader(): Headers {
    return new Headers({'Authorization': 'Bearer ' + this.loggedUserToken.token});
  }
  getAuthHeaderMultipart(): Headers {
    return new Headers({'Authorization': 'Bearer ' + this.loggedUserToken.token});
  }
  getJSONHeader(): Headers {
    return this.headers;
  }
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


  private extractData(res: Response) {
    const body: UserModel = res.json();
    return body || {};
  }
  private extractDataList(res: Response) {
    const body: UserModel[] = res.json();
    return body || [];
  }

  private handleErrorLogin (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errorMsg: string;
    if (error instanceof Response) {
      const status = error.status;
      if (status === 401) {
        errorMsg = 'Bad username or password';
      }
      if (status === 500) {
        errorMsg = 'There was an issue with database!';
      }
      if (status === 204) {
        errorMsg = 'All ready logged in';
      }
      return Observable.throw(errorMsg);
    }
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
