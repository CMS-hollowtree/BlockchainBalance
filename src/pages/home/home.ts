import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

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
  btcPriceData:any;
  btcPriceLast7Days: any = [];

	@ViewChild('lineCanvas', {read: ElementRef}) lineCanvas: ElementRef;
	public lineChart: any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public storage: Storage) {
  	this.getETHPrice();
    this.getCoinPriceHistory();
  }

  ngAfterViewInit(){
    //console.log('canvas',this.lineCanvas);
  }

  ionViewDidLoad(){
  	this.btcChart();  
  	
  }

  ionViewWillEnter(){
  
  	this.getETHPrice();
  	this.storage.get('wallet').then((val) => {
  		if(val != null){
  			this.address = JSON.parse(val);
  			this.restProvider.getWallet(this.address).subscribe(wallet => {
		  		this.wallet = wallet;
		  		this.getImgUrls();

		  		if(this.address != "") {
		  			this.totalBalance = 0;
		  			this.totalBalance += (this.ethPrice.price_usd * this.wallet.ETH.balance);
			  		this.wallet.tokens.forEach(obj => {
			  			this.totalBalance += (obj.tokenInfo.price.rate * (obj.balance * Math.pow(10, -obj.tokenInfo.decimals)));
			  			
			  		})
			  		
			  	}
		  		
	  		});
  		}else{
  			this.address = "";
  		}
  	})

  }

  btcChart(){
    this.restProvider.getCoinPrice('BTC').subscribe(res => {
      //this.btcPriceData = data['Data'];
      let coinHistory = res['Data'].map((a) => (a.close));
      let coinTimes = res['Data'].map((a) => (a.time));

    //console.log(this.btcPriceLast7Days.values());
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            options: {
    legend: {
        display: false
    },
            data: {
                labels: coinTimes,

                datasets: [
                    {
                        label: "Today",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: coinHistory,
                        spanGaps: false,
                    }
                ]
            }
 
        });
    });
    
  }

  getETHPrice(){
  	this.restProvider.getETHPrice().subscribe(price => {
		  this.ethPrice = price;
	  });
  }

  getCoinPriceHistory(){
    this.restProvider.getCoinPrice('BTC').subscribe(data => {
      this.btcPriceData = data['Data'];
      this.btcPriceData.forEach(obj => {
        //console.log(obj['close']);
        this.btcPriceLast7Days.push(obj['close']);
      })
    });

    //console.log('this one bruh', this.btcPriceLast7Days);
  }

  getImgUrls(){
  	if(this.address != "") {
  		this.restProvider.getCoinData().subscribe(coinData => {
  			this.coinData = coinData;
  			//console.log(this.coinData);
  			this.wallet.ETH.imgUrl = 'https://www.cryptocompare.com'+this.coinData['Data']['ETH']['ImageUrl'];
  			this.wallet.tokens.forEach(obj => {
  				obj.imgUrl = 'https://www.cryptocompare.com'+this.coinData['Data'][obj.tokenInfo.symbol]['ImageUrl'];
  			})
  		});
	  }
  }

}
