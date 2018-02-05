import { Component } from '@angular/core';
import { NavController, Tabs } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  tab:Tabs;
	wallet:any;
  btcWallet:any;
  ltcWallet:any;
  btcEnabled:boolean;
  ethEnabled:boolean;
  ltcEnabled:boolean;
	options:BarcodeScannerOptions;
	scanData: {};

  constructor(public navCtrl: NavController, public storage: Storage, private barcode: BarcodeScanner, public toastCtrl: ToastController) {
    this.tab = this.navCtrl.parent;

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
      }else{
        //     
      }
    });
    this.storage.get('ltcWallet').then((val) => {
      if(val != null){
        let ltcWallet = JSON.parse(val);
        this.ltcWallet = ltcWallet;
      }else{
        //     
      }
    });

    this.storage.get('ethEnabled').then((val) => {
      if(val != null){
        let ethEnabled = JSON.parse(val);
        this.ethEnabled = ethEnabled;
      }else{
        this.ethEnabled = true;
      }
    });
    this.storage.get('ltcEnabled').then((val) => {
      if(val != null){
        let ltcEnabled = JSON.parse(val);
        this.ltcEnabled = ltcEnabled;
      }else{
        this.ltcEnabled = true;
      }
    });
    this.storage.get('btcEnabled').then((val) => {
      if(val != null){
        let btcEnabled = JSON.parse(val);
        this.btcEnabled = btcEnabled;
      }else{
        this.btcEnabled = true;
      }
    });

  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }

  save(){
    this.saveBTC();
    this.saveETH();
    this.saveLTC();
    //
  }

  clearStorage(){
    this.btcWallet = null;
    this.ltcWallet = null;
    this.wallet = null;
    this.btcEnabled = null;
    this.ethEnabled = null;
    this.ltcEnabled = null;

    this.storage.clear();
    //this.presentToast('Cleared');
    this.tab.select(0);
  }

  saveBTC(){
  	let btcWallet = this.btcWallet;
    let btcEnabled = this.btcEnabled;
    if(btcWallet){
      this.storage.set('btcWallet', JSON.stringify(btcWallet));
    }
    this.storage.set('btcEnabled', JSON.stringify(btcEnabled));
  }
  saveETH(){
    let wallet = this.wallet;
    let ethEnabled = this.ethEnabled;
    if(wallet){
      this.storage.set('wallet', JSON.stringify(wallet));
    }
    this.storage.set('ethEnabled', JSON.stringify(ethEnabled));
  }
  saveLTC(){
    let ltcWallet = this.ltcWallet;
    let ltcEnabled = this.ltcEnabled;
    if(ltcWallet){
      this.storage.set('ltcWallet', JSON.stringify(ltcWallet));
    }
    this.storage.set('ltcEnabled', JSON.stringify(ltcEnabled));
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
