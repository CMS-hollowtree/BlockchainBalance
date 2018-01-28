import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	wallet:any;
	totalBalance: number;
	ethPrice:any;
	Math:Math = Math;
	address:string;

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public storage: Storage) {

  }

  ionViewWillEnter(){
  	this.restProvider.getETHPrice().subscribe(price => {
		this.ethPrice = price;
		this.totalBalance += this.ethPrice.price_usd;
	});
  	this.storage.get('wallet').then((val) => {
  		if(val != null){
  			this.address = JSON.parse(val);
  			this.restProvider.getWallet(this.address).subscribe(wallet => {
		  		this.wallet = wallet;
		  		console.log(wallet);

		  		if(this.wallet != null) {
		  			this.totalBalance = 0;
			  		this.wallet.tokens.forEach(obj => {
			  			this.totalBalance += (obj.tokenInfo.price.rate * (obj.balance * Math.pow(10, -obj.tokenInfo.decimals)));
			  			
			  		})
			  		
			  	}
		  		
	  		});
  		}else{
  			//
  		}
  	})

  }

}
