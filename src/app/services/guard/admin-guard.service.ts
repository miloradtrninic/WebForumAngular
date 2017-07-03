import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Rx'
import {UserService} from '../user.service';

@Injectable()
export class AdminGuardService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getRole() === 'ADMIN' ;
  }

  constructor(private userService: UserService) { }

}
