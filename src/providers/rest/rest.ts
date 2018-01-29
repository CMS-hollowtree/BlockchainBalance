import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
	apiKey = 'freekey';
	url;
	coincapUrl;
	cyrptocompareUrl;
  coinPriceUrl;


  constructor(public http: HttpClient) {
    this.url = 'https://api.ethplorer.io/';
    this.coincapUrl ='http://coincap.io/page/ETH/';
    this.cyrptocompareUrl = 'https://min-api.cryptocompare.com/data/all/coinlist';
    this.coinPriceUrl = 'https://min-api.cryptocompare.com/data/';
    
  }

  getWallet(addr) {
  	return this.http.get(this.url+'getAddressInfo/'+addr+'?apiKey='+this.apiKey)
  		.map(res => (res));
  }

  getETHPrice(){
  	return this.http.get(this.coincapUrl)
  		.map(price => (price));
  }

  getCoinData(){
  	return this.http.get(this.cyrptocompareUrl)
  		.map(coinlist => (coinlist));
  }

  getCoinPrice(coinSymbol) {
    return this.http.get(this.coinPriceUrl+'histominute?fsym='+coinSymbol+'&tsym=USD&limit=1440&aggregate=5&e=GDAX')
      .map(priceData => (priceData));
  }

}
