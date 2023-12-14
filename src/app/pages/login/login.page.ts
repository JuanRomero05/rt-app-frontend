import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonLoading, AlertController } from '@ionic/angular';
import { logIn } from 'src/api/resources/auth';
import { getAuthUser } from 'src/api/resources/users';
import { getToken, storeToken, storeUserId } from 'src/storage/auth';
import { createAlert } from 'src/utils/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup

  showPassword: boolean = false;

  eyeIcon: string = 'eye-outline';

  @ViewChild('pwInput') passwordInput: any;
  @ViewChild('loading') loading: IonLoading;

  constructor(
    public alertController: AlertController,
    public fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
    this.loading = null as any
  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    // verify if there is an available session
    this.loading.present()
    const token = await getToken()
    this.loading.dismiss(null, 'cancel')
    if (token) 
      await this.router.navigate(['/tabs/home']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordInput.type = this.showPassword ? 'text' : 'password';
    this.eyeIcon = this.showPassword ? 'eye-off' : 'eye-outline';
  }

  async enterApp() {
    this.loading.present()
    const { username, password } = this.loginForm.controls
    const request = await logIn({
      username: username.value,
      password: password.value
    })
    this.loading.dismiss(null, 'cancel')
    if (request.code != 200) {
      const alert = await createAlert(
        this.alertController,
        'Login failed',
        request.msg
      )
      await alert.present()
      return
    } 
    // login successful
    await storeToken(request.data.token)
    const user = await getAuthUser() 
    await storeUserId(user.data.id)
    username.setValue('')
    password.setValue('')
    await this.router.navigate(['/tabs/home']);
  }
}
