import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  ready = false;
  error = false;

  constructor(private flashlight: Flashlight, private platform: Platform) { 
    this.platform.ready()
    .then(
      () => this.platform.is('cordova')
    )
    .then(
      isCordova => {
        if(isCordova){
          return this.flashlight.available()
        } else {
          return Promise.reject('No es cordoba');
        }
      }
    )
    .then(
      isAvailable => {
        if(isAvailable){
          return Promise.resolve(true);
        } else {
          return Promise.reject('No hay flash');
        }
      }
    )
    .then(
      () => this.ready = true
    )
    .catch(
      () => this.error = true
    );
  }

  toggleFlash() {
    this.flashlight.toggle();
  }
}
