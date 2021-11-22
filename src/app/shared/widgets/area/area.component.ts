import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/Account';
import * as $ from 'jquery';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  chartOptions: {};

  Highcharts = Highcharts;

  account: Account[] = [];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    var ctg: any = [];
    var nic: any = [];
    var yca: any = [];
    this.accountService.getAccount().subscribe((account) => {
     account.forEach(function(item) {
       ctg.push(item.date),
       nic.push(item.nic),
       yca.push(item.yca)
     })
    });
   console.log(ctg, nic, yca);
  
    Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });
    this.chartOptions = {
      chart: {
        width: 1000
        
    },
    title: {
        text: 'Value Vs. Net Investment',
        align: 'left',
        style: {
          color: '#735926',
          fontSize: '30px',
          fontFamily: 'Californian FB',
          fontWeight: 'bold'
      }
    },
    xAxis: {
      tickmarkPlacement: 'on',
        categories: ctg
    },
    yAxis: {
      
      min: 50000,
      data: nic,
      startOnTick: false,
        title: {
            text: 'Portfolio'
        },
        labels: {
          format: '${value:,.0f}'
        }
    },
    tooltip: {
        shared: true,
        valuePrefix: "$",
    },
    credits: {
        enabled: false
    },
    exporting: {
      enabled: true
    },
    plotOptions: {
      series: {
      	pointPlacement: 'on'
      },
      spline: {
        lineWidth: 5,
      area: {
        linewidth: 0.1,

      }
      }
      
    },
    series: [ {
        type: 'area',
        id: 'net-investment',
        name: 'Net invested capital',
        data: [75000,114500, 114500, 120550, 130000, 114500, 150500, 195000, 200500, 250580, 250500, 250500, 280500],
        color: '#adad85',
        marker: {
          enabled: false
        }
        
    },
      {
      type: 'spline',
      id: 'market-value',
      name: 'Your combined accounts',
      data: [75000,114500, 120500, 125550, 170000,255500, 160500, 210000, 220500, 290580, 330500, 400500, 450500],
      color: '#0000CD',
      marker: {
        enabled: true
    }

    }]
};

HC_exporting(Highcharts);

setTimeout(() => {
  window.dispatchEvent(
    new Event('resize')
  );
}, 300);
  }

}