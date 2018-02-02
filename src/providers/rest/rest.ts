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
  blockcypherBTC;
  blockcypherLTC;


  constructor(public http: HttpClient) {
    this.url = 'https://api.ethplorer.io/';
    this.coincapUrl ='http://coincap.io/page/';
    this.cyrptocompareUrl = 'https://min-api.cryptocompare.com/data/all/coinlist';
    this.coinPriceUrl = 'https://min-api.cryptocompare.com/data/';
    this.blockcypherBTC= 'https://api.blockcypher.com/v1/btc/main/addrs/';
    this.blockcypherLTC= 'https://api.blockcypher.com/v1/ltc/main/addrs/';
    
  }

  getWallet(addr) {
  	return this.http.get(this.url+'getAddressInfo/'+addr+'?apiKey='+this.apiKey)
  		.map(res => (res));
  }

  getCoinImgs(){
  	return this.http.get(this.cyrptocompareUrl)
  		.map(coinlist => (coinlist));
  }

  getCoinPriceHistory(coinSymbol) {
    return this.http.get(this.coinPriceUrl+'histominute?fsym='+coinSymbol+'&tsym=USD&limit=1440&aggregate=15&e=GDAX')
      .map(priceData => (priceData));

  }

  getCoinPrice(coinSymbol) {
    return this.http.get(this.coinPriceUrl+'price?fsym='+coinSymbol+'&tsyms=USD')
      .map(priceData => (priceData));

  }

  getBTCtxs(addr){
    return this.http.get(this.blockcypherBTC+addr)
      .map(txs => (txs));
  }

  getLTCtxs(addr){
    return this.http.get(this.blockcypherLTC+addr)
      .map(txs => (txs));
  }

  get24Hchange(coinSymbol){
    return this.http.get(this.coincapUrl+coinSymbol)
      .map(change => (change));
  }

}
