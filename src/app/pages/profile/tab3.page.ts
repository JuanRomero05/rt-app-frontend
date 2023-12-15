import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonLoading, IonMenu } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';
import { getUserById, updateUser } from 'src/api/resources/users';
import { clearToken, clearUserId, getToken, getUserId } from 'src/storage/auth';
import { createAlert } from 'src/utils/alert';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  editProfileForm: FormGroup;

  showPassword: boolean = false;
  showRepeatPassword: boolean = false;
  eyeIcon: string = 'eye-outline';
  eyeIconRepeat: string = 'eye-outline';
  user: any
  updating: boolean = false

  @ViewChild('menu') menu: IonMenu;
  @ViewChild('loading') loading: IonLoading;
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
    this.loading = null as any
    this.editProfileForm = this.fb.group({
      'firstName': new FormControl,
      'lastName': new FormControl,
      'password': new FormControl,
      'repeatPassword': new FormControl,
    }, { validator: this.pwMatchValidator })
  }

  async ngOnInit() {
    const id = await getUserId()
    if (id){
      const request = await getUserById(parseInt(id))
      this.user = request.data
      this.resetEditForm()
      return
    }
    await this.router.navigate(['/login'])
  }

  async ionViewWillEnter(){
    this.loading.present()
    const id = await getUserId()
    if (id){
      const request = await getUserById(parseInt(id))
      this.user = request.data
      this.resetEditForm()
      this.loading.dismiss(null, 'cancel')
      return
    }
    this.loading.dismiss(null, 'cancel')
    await this.router.navigate(['/login'])
  }
  
  resetEditForm(){
    const { controls } = this.editProfileForm
    controls['firstName'].setValue(this.user.firstName)
    controls['lastName'].setValue(this.user.lastName)
    controls['password'].setValue('')
    controls['repeatPassword'].setValue('')
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
            await clearToken()
            await clearUserId()
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
    this.updating = true
    const { controls } = this.editProfileForm
    if (!controls['firstName'].value || !controls['lastName'].value){
      const alert = await createAlert(
        this.alertController,
        'Update failed',
        "Empty name or last name are not allowed"
      )
      await alert.present()
      this.updating = false
      return
    }
    const body: any = { 
      firstName: controls['firstName'].value,
      lastName: controls['lastName'].value
    }
    // if password fields are not empty, password is evaluated
    if (controls['password'].value || controls['repeatPassword'].value){
      // password match
      if (controls['password'].value != controls['repeatPassword'].value){
        const alert = await createAlert(
          this.alertController,
          'Update failed',
          "Passwords don't match"
        )
        this.updating = false
        await alert.present()
        return
      }
      body.password = controls['password'].value
    }
    let request = await updateUser(this.user.id, body)
    if (request.code != 200){
      const alert = await createAlert(
        this.alertController,
        'Update failed',
        request.msg
      )
      await alert.present()
      this.updating = false
      return
    }
    request = await getUserById(request.data.id)
    this.user = request.data
    const alert = await createAlert(
      this.alertController,
      'Update succeed',
      'Your account has been successfully updated'
    )
    await alert.present()
    this.updating = false
    this.resetEditForm()
  }
}
