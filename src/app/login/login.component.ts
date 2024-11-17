import { Component, effect, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PASSWORD_MIN_LENGTH, PASSWORD_PATTERN } from '../shared/constants';
import { Router } from '@angular/router';
import { RememberMeService } from '../shared/services/remember-me.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup | undefined;
  isSubmitted = false;
  private router = inject(Router);
  private rememberMeService = inject(RememberMeService);

  ngOnInit(): void {
    this.loginForm = this.getLoginForm();
  }

  onSubmit(): void {
    if (!this.loginForm) {
      return;
    }

    this.loginForm.updateValueAndValidity();
    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    const { rememberMe, ...payload } = this.loginForm.value;

    this.rememberMeService.set(rememberMe, payload.username);
  }

  private getLoginForm(): FormGroup {
    const rememberMeUsername = this.rememberMeService.get();

    return new FormGroup({
      username: new FormControl(rememberMeUsername ?? null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(PASSWORD_MIN_LENGTH),
        Validators.pattern(PASSWORD_PATTERN),
      ]),
      rememberMe: new FormControl(!!rememberMeUsername),
    });
  }
}