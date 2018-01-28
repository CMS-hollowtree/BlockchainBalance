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
	coinData:any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public storage: Storage) {
  	this.getETHPrice();
  }

  ionViewWillEnter(){
  	this.getETHPrice();
  	this.storage.get('wallet').then((val) => {
  		if(val != null){
  			this.address = JSON.parse(val);
  			this.restProvider.getWallet(this.address).subscribe(wallet => {
		  		this.wallet = wallet;
		  		this.getImgUrls();
		  		console.log(wallet);
		  		

		  		if(this.wallet != null) {
		  			this.totalBalance = 0;
		  			this.totalBalance += (this.ethPrice.price_usd * this.wallet.ETH.balance);
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

  getETHPrice(){
  	this.restProvider.getETHPrice().subscribe(price => {
		this.ethPrice = price;
		
	});
  }

  getImgUrls(){
	this.restProvider.getCoinData().subscribe(coinData => {
		this.coinData = coinData;
		this.wallet.ETH.imgUrl = 'https://www.cryptocompare.com'+this.coinData['Data']['ETH']['ImageUrl'];
		this.wallet.tokens.forEach(obj => {
			obj.imgUrl = 'https://www.cryptocompare.com'+this.coinData['Data'][obj.tokenInfo.symbol]['ImageUrl'];
			console.log(obj.imgUrl);
		})
		console.log(this.wallet);
	});
  }

}
