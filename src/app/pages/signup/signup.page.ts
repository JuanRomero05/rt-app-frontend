import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createAlert } from 'src/utils/alert';
import { signUp } from 'src/api/resources/auth';
import { AlertController, IonLoading } from '@ionic/angular';

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

  selectedCheckbox: string = 'public';

  @ViewChild('loading') loading: IonLoading;
  @ViewChild('passwordInput') passwordInput: any;
  @ViewChild('repeatPasswordInput') repeatPasswordInput: any;

  constructor(
    public alertController: AlertController,
    public fb: FormBuilder,
    private router: Router,
  ) {
    this.signupForm = this.fb.group({
      'username': new FormControl("", Validators.required),
      'firstName': new FormControl("", Validators.required),
      'lastName': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'repeatPassword': new FormControl("", Validators.required),
    }, { validator: this.pwMatchValidator });
    this.loading = null as any
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

  cleanForm() {
    const { username, firstName, lastName, password, repeatPassword } = this.signupForm.controls
    username.setValue('')
    firstName.setValue('')
    lastName.setValue('')
    password.setValue('')
    repeatPassword.setValue('')
    this.selectedCheckbox = 'public'
  }

  async saveData() {
    const { username, firstName, lastName, password, repeatPassword } = this.signupForm.controls
    if (password.value != repeatPassword.value) {
      const alert = await createAlert(
        this.alertController, 
        'Sign up failed',
        "Passwords don't match"
      )
      await alert.present()
      return
    }

    const request = await signUp({
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
      isCritic: this.selectedCheckbox == 'critic' ? true : false
    })

    if (request.code != 201) {
      const alert = await createAlert(
        this.alertController, 
        'Sign up failed',
        request.msg
      )
      await alert.present()
      return
    } 

    // sign up successful
    const alert = await createAlert(
      this.alertController, 
      'Sign up succeed',
      'You have successfully registered a new account'
    )
    await alert.present()
    this.cleanForm()
    await this.router.navigate(['/login']); 
  }
}
