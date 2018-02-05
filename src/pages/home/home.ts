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
  btc24:number;
  ltc24:number;
  eth24:number;
  btcEnabled:boolean;
  ethEnabled:boolean;
  ltcEnabled:boolean;
	totalBalance:number;
	ethPrice:any;
	btcPrice:any;
	ltcPrice:any;
	Math:Math = Math;
	btcAddress:string;
  ethAddress:string;
  ltcAddress:string;
	coinData:any;
  btcPriceData:any;
  btcPriceLast7Days:any = [];

	@ViewChild('lineCanvasBTC', {read: ElementRef}) lineCanvasBTC: ElementRef;
	@ViewChild('lineCanvasLTC', {read: ElementRef}) lineCanvasLTC: ElementRef;
	@ViewChild('lineCanvasETH', {read: ElementRef}) lineCanvasETH: ElementRef;
	public lineChart: any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public storage: Storage) {
  	this.getBtcEthLtcPrices();
    this.get24HChange();
  }

  ngAfterViewInit(){
    
  }

  ionViewDidLoad(){
  	this.ethChart();
  	this.btcChart(); 
  	this.ltcChart();
  }

  ionViewWillEnter(){
    this.totalBalance = 0;

    this.storage.get('btcEnabled').then((val) => {
      if(val != null){
        this.btcEnabled = JSON.parse(val);
      }else{
        //
      }
    })
    this.storage.get('ethEnabled').then((val) => {
      if(val != null){
        this.ethEnabled = JSON.parse(val);
      }else{
        //
      }
    })
    this.storage.get('ltcEnabled').then((val) => {
      if(val != null){
        this.ltcEnabled = JSON.parse(val);
      }else{
        //
      }
    })
  
  	this.storage.get('wallet').then((val) => {
  		if(val != null){
  			this.ethAddress = JSON.parse(val);
  			this.restProvider.getWallet(this.ethAddress).subscribe(wallet => {
		  		this.wallet = wallet;
		  		this.getImgUrls();
		  		//add total balance
          if(this.ethEnabled == true){
            this.totalBalance += (this.wallet.ETH.balance * this.ethPrice);
            this.wallet.tokens.forEach(obj => {
              if(obj.tokenInfo.price !== false){
                this.totalBalance += (obj.tokenInfo.price.rate * (obj.balance * Math.pow(10, -obj.tokenInfo.decimals)));
              }
              
            });
          }

	  		});
  		}else{
  			//this.ethAddress = "";
  		}
  	})
    this.storage.get('btcWallet').then((val) => {
      if(val != null){
        this.btcAddress = JSON.parse(val);
        this.restProvider.getBTCtxs(this.btcAddress).subscribe(txs => {
          this.btcWallet = txs;
          //add total balance
          if(this.btcEnabled == true){
            this.totalBalance += (this.btcPrice * (this.btcWallet.balance * Math.pow(10, -8)));
          }
        });
      }else{
        //
      }
    })
    this.storage.get('ltcWallet').then((val) => {
      if(val != null){
        this.ltcAddress = JSON.parse(val);
        this.restProvider.getLTCtxs(this.ltcAddress).subscribe(txs => {
          this.ltcWallet = txs;
          //add total balance
          if(this.ltcEnabled){
            this.totalBalance += (this.ltcPrice * (this.ltcWallet.balance * Math.pow(10, -8)));
          }
        });
      }else{
        //
      }
    })

  }

  doRefresh(refresher) {
    this.ionViewWillEnter();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  btcChart(){
    this.restProvider.getCoinPriceHistory('BTC').subscribe(res => {
      let coinHistory = res['Data'].map((a) => (a.close));
      let coinTimes = res['Data'].map((a) => (a.time));

    this.lineChart = new Chart(this.lineCanvasBTC.nativeElement, {
        type: 'line',
        options: {
          tooltips: {
            enabled: false
          },
          hover: {
            mode: null
          },
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
      let coinHistory = res['Data'].map((a) => (a.close));
      let coinTimes = res['Data'].map((a) => (a.time));

    this.lineChart = new Chart(this.lineCanvasETH.nativeElement, {
        type: 'line',
        options: {
          tooltips: {
            enabled: false
          },
          hover: {
            mode: null
          },
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
                    backgroundColor: "rgba(4,4,4,0.4)",
                    borderColor: "rgba(4,4,4,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(4,4,4,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(4,4,4,1)",
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
      let coinHistory = res['Data'].map((a) => (a.close));
      let coinTimes = res['Data'].map((a) => (a.time));

    this.lineChart = new Chart(this.lineCanvasLTC.nativeElement, {
        type: 'line',
        options: {
          tooltips: {
            enabled: false
          },
          hover: {
            mode: null
          },
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

 get24HChange(){
   this.restProvider.get24Hchange('BTC').subscribe(btc => {
     this.btc24 = btc['cap24hrChange'];
   })
   this.restProvider.get24Hchange('LTC').subscribe(ltc => {
     this.ltc24 = ltc['cap24hrChange'];
   })
   this.restProvider.get24Hchange('ETH').subscribe(eth => {
     this.eth24 = eth['cap24hrChange'];
   })
 }

  getImgUrls(){
  	if(this.ethAddress != null) {
  		this.restProvider.getCoinImgs().subscribe(coinData => {
  			this.coinData = coinData;
  			this.wallet.ETH.imgUrl = 'https://www.cryptocompare.com'+this.coinData['Data']['ETH']['ImageUrl'];
  			this.wallet.tokens.forEach(obj => {
          if(this.coinData['Data'][obj.tokenInfo.symbol]){
            obj.imgUrl = 'https://www.cryptocompare.com'+this.coinData['Data'][obj.tokenInfo.symbol]['ImageUrl'];  
          }else{
            obj.imgUrl = 'https://www.cryptocompare.com'+this.coinData['Data']['ETH']['ImageUrl'];
          }

  			})
  		});
	  }
  }

}
