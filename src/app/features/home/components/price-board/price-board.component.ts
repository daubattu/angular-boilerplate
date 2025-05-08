import { Component } from '@angular/core';

@Component({
  selector: 'app-price-board',
  imports: [],
  templateUrl: './price-board.component.html',
  styleUrl: './price-board.component.scss'
})
export class PriceBoardComponent {
  isPriceShow = true;

  groupPrice = this.isPriceShow
    ? [
        {
          key: 'change',
          label: 'Thay đổi',
          width: 80,
        },
        {
          key: 'percentChange',
          label: '% Thay đổi',
          width: 80,
        },
      ]
    : [];


  columns = [
    {
      key: 'symbol',
      label: 'Mã',
      width: 80,
    },
    {
      key: this.isPriceShow ? 'price' : 'volume',
      label: this.isPriceShow ? 'Giá' : 'Khối lượng',
      width: 80,
    },
  ]
}
