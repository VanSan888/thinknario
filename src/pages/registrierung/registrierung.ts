import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  Loading,
  LoadingController,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { MyApp } from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-registrierung',
  templateUrl: 'registrierung.html',
})
export class RegistrierungPage {
	
public signupForm: FormGroup;
  loading: Loading;
  constructor(public navCtrl: NavController, public authData: AuthData,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController) {

      this.signupForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
    }
	
	signupUser(){
  if (!this.signupForm.valid){
    console.log(this.signupForm.value);
  } else {
    this.authData.signupUser(this.signupForm.value.email, 
        this.signupForm.value.password)
    .then(() => {
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot(MyApp);
      });
    }, (error) => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
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
	
}