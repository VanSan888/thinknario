import { Component } from '@angular/core';
import {
  IonicPage, 
  Loading,
  LoadingController, 
  NavController,
  AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthData } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html'
})
export class LogInPage {


public loginForm:FormGroup;
public loading:Loading;

  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public authData: AuthData, public formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, 
        EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), 
        Validators.required])]
    });
  }

  loginUser(): void {
  if (!this.loginForm.valid){
    console.log(this.loginForm.value);
  } else {
    this.authData.loginUser(this.loginForm.value.email, 
        this.loginForm.value.password)
    .then( authData => {
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot('HomePage');
      });
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'Abbrechen'
            }
          ]
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}

goToSignup(): void { this.navCtrl.push('RegistrierungPage'); }

goToResetPassword(): void { this.navCtrl.push('ResetPasswordPage'); }

}
