import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
	wallet:any;

  constructor(public navCtrl: NavController, public storage: Storage) {
  	this.storage.get('wallet').then((val) => {
  		if(val != null){
  			let wallet = JSON.parse(val);
  			this.wallet = wallet;
  		}else{
  			//
  		}
  	});

  }

  saveForm(){
  	let wallet = this.wallet;
  	this.storage.set('wallet', JSON.stringify(wallet));
  	console.log('saved ', JSON.stringify(wallet));
  }
}
