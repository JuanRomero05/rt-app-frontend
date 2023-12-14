import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;

  showPassword: boolean = false;
  showRepeatPassword: boolean = false;

  eyeIcon: string = 'eye-outline';
  eyeIconRepeat: string = 'eye-outline';

  selectedCheckbox: string = '';

  @ViewChild('passwordInput') passwordInput: any;
  @ViewChild('repeatPasswordInput') repeatPasswordInput: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
  ) {
    this.signupForm = this.fb.group({
      'username': new FormControl("", Validators.required),
      'firstName': new FormControl("", Validators.required),
      'lastName': new FormControl("", Validators.required),
      /* 'bio': new FormControl("", Validators.required), */
      'password': new FormControl("", Validators.required),
      'repeatPassword': new FormControl("", Validators.required),
    }, { validator: this.pwMatchValidator });
  }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordInput.type = this.showPassword ? 'text' : 'password';
    this.eyeIcon = this.showPassword ? 'eye-off' : 'eye-outline';

  }

  toggleRepeatPasswordVisibility() {
    this.showRepeatPassword = !this.showRepeatPassword;
    this.repeatPasswordInput.type = this.showRepeatPassword ? 'text' : 'password';
    this.eyeIconRepeat = this.showRepeatPassword ? 'eye-off' : 'eye-outline';
  }

  pwMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;

    if (password !== repeatPassword) {
      control.get('repeatPassword')?.setErrors({ 'passwordMismatch': true });

    } else {
      control.get('repeatPassword')?.setErrors(null);

    }
  }

  async saveData() {
    await this.router.navigate(['/login']);
  }

}
