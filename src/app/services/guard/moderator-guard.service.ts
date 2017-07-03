/**
 * Created by komp on 6/27/2017.
 */
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Rx'
import {UserService} from '../user.service';

@Injectable()
export class ModeratorGuardService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getRole() === 'ADMIN' || this.userService.getRole() === 'MODERATOR' ;
  }

  constructor(private userService: UserService) { }

}
