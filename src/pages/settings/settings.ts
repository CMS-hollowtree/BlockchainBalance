import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
	wallet:any;
	options: BarcodeScannerOptions;
	scanData: {};

  constructor(public navCtrl: NavController, public storage: Storage, private barcode: BarcodeScanner) {
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

  scan(){
  	this.options = {
  		prompt: "Scan your ethereum public address QR code"
  	}
  	this.barcode.scan(this.options).then((data) => {
  		this.scanData = data;
  		this.wallet = this.scanData['text'];
  	}, (err) => {
  		console.log("error", err);
  	});
  }

}
