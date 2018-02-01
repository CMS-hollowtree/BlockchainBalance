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
  btcWallet:any;
  ltcWallet;
	options: BarcodeScannerOptions;
	scanData: {};
  testBTCaddr:string = '18TExftLbtUe8ykFkyyeUEvV3W4cxy7Wch';
  testLTCaddr:string = 'LZA9vgkJkQj58YXpLsZpaULdGtPeayqT4G';
  testETHaddr:string = '0x52da0B25849f3ae61891dfC82c018A09e677B6Fe';

  constructor(public navCtrl: NavController, public storage: Storage, private barcode: BarcodeScanner) {
  	this.storage.get('wallet').then((val) => {
  		if(val != null){
  			let wallet = JSON.parse(val);
  			this.wallet = wallet;
  		}else{
  			//
  		}
  	});
    this.storage.get('btcWallet').then((val) => {
      if(val != null){
        let btcWallet = JSON.parse(val);
        this.btcWallet = btcWallet;
        console.log('not null', this.btcWallet);
      }else{
        console.log('i null', this.btcWallet);
        
      }
    });
    this.storage.get('ltcWallet').then((val) => {
      if(val != null){
        let ltcWallet = JSON.parse(val);
        this.ltcWallet = ltcWallet;
        console.log('not null', this.ltcWallet);
      }else{
        console.log('i null', this.ltcWallet);
        
      }
    });

  }

  save(){
    this.saveBTC();
    this.saveETH();
    this.saveLTC();
  }

  clearStorage(){
    this.storage.clear();
  }

  saveBTC(){
  	let btcWallet = this.btcWallet;
  	this.storage.set('btcWallet', JSON.stringify(btcWallet));
  	console.log('saved ', JSON.stringify(btcWallet));
  }
  saveETH(){
    let wallet = this.wallet;
    this.storage.set('wallet', JSON.stringify(wallet));
    console.log('saved ', JSON.stringify(wallet));
  }
  saveLTC(){
    let ltcWallet = this.ltcWallet;
    this.storage.set('ltcWallet', JSON.stringify(ltcWallet));
    console.log('saved ', JSON.stringify(ltcWallet));
  }

  scanBTC(){
  	this.options = {
  		prompt: "Scan your bitcoin public address QR code"
  	}
  	this.barcode.scan(this.options).then((data) => {
  		this.scanData = data;
  		this.btcWallet = this.scanData['text'];
  	}, (err) => {
  		console.log("error", err);
  	});
  }
  scanETH(){
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
  scanLTC(){
    this.options = {
      prompt: "Scan your litecoin public address QR code"
    }
    this.barcode.scan(this.options).then((data) => {
      this.scanData = data;
      this.ltcWallet = this.scanData['text'];
    }, (err) => {
      console.log("error", err);
    });
  }

}
