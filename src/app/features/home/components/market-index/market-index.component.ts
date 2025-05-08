import { Component, Input } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import marketIndex from '../../mockups/marketIndex';

@Component({
  selector: 'market-index',
  imports: [HighchartsChartModule],
  templateUrl: './market-index.component.html',
  styleUrl: './market-index.component.scss'
})
export class MarketIndexComponent {
  @Input() index: string = 'HOSE'; // Mặc định là HOSE

  Highcharts: typeof Highcharts = Highcharts;

  rawData: any = marketIndex['HOSE']?.Index ?? []

  categories = this.rawData.map((d: any) => d.indexTime);
  marketIndexData = this.rawData.map((d: any) => d.marketIndex);
  volumeData = this.rawData.map((d: any) => d.volume ?? 0);

  chartOptions: Highcharts.Options = {
    title: {
      text: undefined
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    chart: {
      zooming: {
        type: 'x'
      }
    },
    xAxis: {
      labels: {
        enabled: false
      },
      crosshair: {
        snap: false
      }, // ✅ Tắt crossh
      gridLineWidth: 0, // ✅ Tắt đường lưới
      tickWidth: 0, // ✅ Tắt tick lớn
    },
    yAxis: [
      {
        title: undefined,
        labels: { enabled: false },
        gridLineWidth: 0, // ✅ Tắt đường lưới
        plotLines: [
          {
            value: 1256,  // Vị trí trên trục Y, nơi bạn muốn vẽ line
            // color: 'red', // Màu của line
            width: 1,     // Độ dày của line
            dashStyle: 'Dash',
            label: {
              text: undefined,
              align: 'center',
              style: {
								color: '#616161',
								width: 1,
              }
            }
          }
        ]
      },
      {
        title: undefined,
        labels: { enabled: false },
        gridLineWidth: 0, // ✅ Tắt đường lưới
      }
    ],
    tooltip: {
      // enabled: false,
      outside: true,
    },
    series: [
      {
        yAxis: 0,
        type: 'line',
        data: this.marketIndexData,
        lineWidth: 2,
        marker: {
          enabled: false
        },
      },
      {
        type: 'column',
        yAxis: 1,
        data: this.volumeData,
      }
    ]
  };
}
