import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable()
export class CanActivateGuard implements CanActivate {
  constructor(public userService: UserService, private router: Router) {}

  canActivate(): boolean {
    return true;
    // if (this.userService.authenticated) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
  }
}
