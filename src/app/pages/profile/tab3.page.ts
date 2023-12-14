import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonMenu } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  editProfileForm: FormGroup;

  showPassword: boolean = false;
  showRepeatPassword: boolean = false;
  eyeIcon: string = 'eye-outline';
  eyeIconRepeat: string = 'eye-outline';

  @ViewChild('menu') menu: IonMenu;
  @ViewChild('editProfileModal') modalEditProfile: IonModal;
  @ViewChild('passwordInput') passwordInput: any;
  @ViewChild('repeatPasswordInput') repeatPasswordInput: any;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router
  ) {
    this.menu = null as any
    this.modalEditProfile = null as any

    this.editProfileForm = this.fb.group({
      'firstName': new FormControl,
      'lastName': new FormControl,
      'password': new FormControl,
      'repeatPassword': new FormControl,
    }, { validator: this.pwMatchValidator })
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

  cancelEditProfile() {
    this.modalEditProfile.dismiss(null, 'cancel');
  }

  createLogOutAlert = async (header: string, message: string) => {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Confirm',
          handler: async () => {
            // se eliminan los datos del almacenamiento local
            /* await Preferences.remove({ key: 'token' })
            await Preferences.remove({ key: 'id' })

            this.restart() */
            this.menu.close()

            // se redirige al login
            this.router.navigate(['/'])
          }
        },
        'Cancel'
      ]
    });

    return alert;
  }

  async logOut() {
    const alert = await this.createLogOutAlert('Log Out?', 'Are you sure you want to log out?')
    await alert.present();
    return;
  }

  async saveEditData() {
    await console.log('a');

  }

}
