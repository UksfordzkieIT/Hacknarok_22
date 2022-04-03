import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login = new FormControl('');
  password = new FormControl('');
  invalid = false;

  constructor(public userService: UserService, public router: Router) {}

  shouldBeDisabled(): boolean {
    return !this.login.value || !this.password.value;
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    if (this.login.value !== 'a' && this.password.value !== 'a') {
      this.invalid = true;
    } else {
      this.invalid = false;
      this.userService.authenticated = true;
      this.router.navigate(['nawigacja']);
    }
  }
}
