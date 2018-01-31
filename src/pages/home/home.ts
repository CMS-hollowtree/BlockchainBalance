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
	btcWallet:any;
	ltcWallet:any;
	totalBalance:number;
	ethPrice:any;
	btcPrice:any;
	ltcPrice:any;
	Math:Math = Math;
	address:string;
	coinData:any;
  	btcPriceData:any;
  	btcPriceLast7Days:any = [];

	@ViewChild('lineCanvasBTC', {read: ElementRef}) lineCanvasBTC: ElementRef;
	@ViewChild('lineCanvasLTC', {read: ElementRef}) lineCanvasLTC: ElementRef;
	@ViewChild('lineCanvasETH', {read: ElementRef}) lineCanvasETH: ElementRef;
	public lineChart: any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public storage: Storage) {
  	this.getBtcEthLtcPrices();
    
  }

  ngAfterViewInit(){
  	
  }

  ionViewDidLoad(){
  	this.ethChart();
  	this.btcChart(); 
  	this.ltcChart();
  	
  	
  }

  ionViewWillEnter(){
  	this.getBtcTxs();
  	this.getLtcTxs();
  
  	this.storage.get('wallet').then((val) => {
  		if(val != null){
  			this.address = JSON.parse(val);
  			this.restProvider.getWallet(this.address).subscribe(wallet => {
		  		this.wallet = wallet;
		  		this.getImgUrls();
		  		//add total balance
		  		this.getTotalBalance();
	  		});
  		}else{
  			this.address = "";
  		}
  	})

  }

  btcChart(){
    this.restProvider.getCoinPriceHistory('BTC').subscribe(res => {
      //this.btcPriceData = data['Data'];
      let coinHistory = res['Data'].map((a) => (a.close));
      let coinTimes = res['Data'].map((a) => (a.time));

    //console.log(this.btcPriceLast7Days.values());
    this.lineChart = new Chart(this.lineCanvasBTC.nativeElement, {
        type: 'line',
        options: {
	        legend: {
	            display: false,
	        	},
	        scales: {
	            xAxes: [{
	                 display: false
	               }],
	            yAxes: [{
	                 display: false
	               }]
	            },
        	},
        data: {
            labels: coinTimes,
            datasets: [
                {
                    label: "Today",
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "rgba(255,153,0,0.4)",
                    borderColor: "rgba(255,153,0,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(255,153,0,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255,153,0,1)",
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

  ethChart(){
    this.restProvider.getCoinPriceHistory('ETH').subscribe(res => {
      //this.btcPriceData = data['Data'];
      let coinHistory = res['Data'].map((a) => (a.close));
      let coinTimes = res['Data'].map((a) => (a.time));

    //console.log(this.btcPriceLast7Days.values());
    this.lineChart = new Chart(this.lineCanvasETH.nativeElement, {
        type: 'line',
        options: {
	        legend: {
	            display: false,
	        	},
	        scales: {
	            xAxes: [{
	                 display: false
	               }],
	            yAxes: [{
	                 display: false
	               }]
	            },
        	},
        data: {
            labels: coinTimes,
            datasets: [
                {
                    label: "Today",
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "rgba(110,110,110,0.4)",
                    borderColor: "rgba(110,110,110,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(110,110,110,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(110,110,110,1)",
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

  ltcChart(){
    this.restProvider.getCoinPriceHistory('LTC').subscribe(res => {
      //this.btcPriceData = data['Data'];
      let coinHistory = res['Data'].map((a) => (a.close));
      let coinTimes = res['Data'].map((a) => (a.time));

    //console.log(this.btcPriceLast7Days.values());
    this.lineChart = new Chart(this.lineCanvasLTC.nativeElement, {
        type: 'line',
        options: {
	        legend: {
	            display: false,
	        	},
	        scales: {
	            xAxes: [{
	                 display: false
	               }],
	            yAxes: [{
	                 display: false
	               }]
	            },
        	},
        data: {
            labels: coinTimes,
            datasets: [
                {
                    label: "Today",
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "rgba(192,192,192,.4)",
                    borderColor: "rgba(192,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(192,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(192,192,192,1)",
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

  getBtcEthLtcPrices(){
  	this.restProvider.getCoinPrice('BTC').subscribe(btc => {
		  this.btcPrice = btc['USD'];
	  });
  	this.restProvider.getCoinPrice('ETH').subscribe(eth => {
		  this.ethPrice = eth['USD'];
	  });
  	this.restProvider.getCoinPrice('LTC').subscribe(ltc => {
		  this.ltcPrice = ltc['USD'];
	  });
  }

 

  getImgUrls(){
  	if(this.address != "") {
  		this.restProvider.getCoinImgs().subscribe(coinData => {
  			this.coinData = coinData;
  			this.wallet.ETH.imgUrl = 'https://www.cryptocompare.com'+this.coinData['Data']['ETH']['ImageUrl'];
  			this.wallet.tokens.forEach(obj => {
  				obj.imgUrl = 'https://www.cryptocompare.com'+this.coinData['Data'][obj.tokenInfo.symbol]['ImageUrl'];
  			})
  		});
	  }
  }

  getBtcTxs(){
  	this.restProvider.getBTCtxs('18TExftLbtUe8ykFkyyeUEvV3W4cxy7Wch').subscribe(txs => {
  		this.btcWallet = txs;
  		console.log(this.btcWallet);
  	});
  }

  getLtcTxs(){
  	this.restProvider.getLTCtxs('LZA9vgkJkQj58YXpLsZpaULdGtPeayqT4G').subscribe(txs => {
  		this.ltcWallet = txs;
  	});
  }

  getTotalBalance(){
  	this.totalBalance = 0;
  	if(this.btcWallet){
  		this.totalBalance += this.btcPrice * (this.btcWallet.balance * Math.pow(10, -8));
  	}
  	if(this.ltcWallet){
  		this.totalBalance += this.ltcPrice * (this.ltcWallet.balance * Math.pow(10, -8));
  	}
  	
  	this.wallet.tokens.forEach(obj => {
  		this.totalBalance += (obj.tokenInfo.price.rate * (obj.balance * Math.pow(10, -obj.tokenInfo.decimals)));
  	});
  }

}
