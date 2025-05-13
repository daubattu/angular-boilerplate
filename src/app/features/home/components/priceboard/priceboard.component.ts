import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import marketIndex from '../../mockups/marketIndex';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { fromEvent, map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { IColumn } from '../../interfaces';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-priceboard',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule, MatIconModule],
  templateUrl: './priceboard.component.html',
  styleUrl: './priceboard.component.scss',
})
export class PriceBoardComponent implements OnInit, AfterViewInit {
  @ViewChild('containerRef') containerRef!: ElementRef;
  private destroy$ = new Subject<void>();

  columns: IColumn[] = [];

  listSymbols = marketIndex.HOSE_PRICE_BOARD.map((item: any) => item.symbol);
  priceboardData = marketIndex.HOSE_PRICE_BOARD

  priceboardDataBySymbol = marketIndex.HOSE_PRICE_BOARD.reduce((acc: any, item: any) => {
    acc[item.symbol] = item;
    return acc;
  }, {});
  
  symbolControl = new FormControl('');
  filteredSymbols!: Observable<string[]>;

  isPriceShow = true;
  isShowValueChange = true;
  isShowHighest = true;
  isShowAvg = true;
  isShowMb = true;

  isShowQuantity = true;

  sortKey: String = '';
  sortType: number = -1;
  maxShowItems = 0;
  currentIndex = 0;
  minIndex = 0;
  maxIndex = 0;

  ngOnInit(): void {
    this.buildColumns();
    
    this.filteredSymbols = this.symbolControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }
  
  ngAfterViewInit(): void {
    const handleResize = () => {
      const height = this.containerRef?.nativeElement?.offsetHeight;

      this.maxShowItems = Math.floor(height / 28); // Assuming each row has a height of 28px
      this.maxIndex = this.currentIndex + this.maxShowItems;
    };

    // Chạy ngay lần đầu
    handleResize();

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$))
      .subscribe(handleResize);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listSymbols.filter((symbol: string) =>
      symbol.toLowerCase().includes(filterValue)
    );
  }

  buildColumns() {
    const groupPrice = this.isPriceShow
      ? [
          {
            key: 'reference',
            label: 'TC',
            compareKey: 'reference',
          },
          {
            key: 'ceiling',
            label: 'Trần',
            compareKey: 'ceiling',
          },
          {
            key: 'floor',
            label: 'Sàn',
            compareKey: 'floor',
          },
        ]
      : [
        {
          key: 'buy/sell',
          label: 'M/B',
        },
        {
          key: 'mcd',
          label: '% MCĐ',
        },
        {
          key: 'dm',
          label: '% DM',
        }
      ];

    const groupPrice2 = this.isShowHighest
      ? [
          {
            key: 'highestPrice',
            label: 'Cao',
            onToogle: (event: Event) => {
              event.stopPropagation()

              if (this.isShowHighest) {
                this.isShowMb = true;
                this.isShowAvg = true;
              }

              this.isShowHighest = !this.isShowHighest;

              this.buildColumns();
            },
            compareKey: 'highestPrice',
          },
          {
            key: this.isShowAvg ? 'avgPrice' : 'mc',
            label: this.isShowAvg ? 'TB' : 'MC',
            onToogle: (event: Event) => {
              event.stopPropagation()

              this.isShowAvg = !this.isShowAvg;
              this.buildColumns();
            },
            compareKey: this.isShowAvg ? 'avgPrice' : 'mc',
          },
          {
            key: 'lowestPrice',
            label: 'Thấp',
            dependOn: 'closePrice',
            compareKey: 'lowestPrice',
          },
        ]
      : [
          {
            key: 'buy',
            label: 'M',
            onToogle: (event: Event) => {
              event.stopPropagation()

              this.isShowHighest = !this.isShowHighest;
              this.buildColumns();
            },
            compareKey: '*',
          },
          {
            key: 'sell',
            label: 'B',
            compareKey: '*',
          },
          {
            key: this.isShowMb ? 'buy/sell' : 'room',
            label: this.isShowMb ? 'M/B' : 'Room',
            onToogle: (event: Event) => {
              event.stopPropagation()

              this.isShowMb = !this.isShowMb;
              this.buildColumns();
            },
            compareKey: '*',
          },
        ];


    this.columns = [
      {
        key: 'symbol',
        label: 'Mã',
        compareKey: 'closePrice',
      },
      {
        key: this.isPriceShow ? 'priceChart' : 'volumeChart',
        label: this.isPriceShow ? 'Giá' : 'KL',
        onToogle: (event: Event) => {
          event.stopPropagation()

          this.isPriceShow = !this.isPriceShow;
          this.buildColumns();
        }
      },
      ...groupPrice,
      {
        key: 'bidPrice3',
        label: 'Giá M 3',
        compareKey: 'bidPrice3',
      },
      {
        key: 'bidVol3',
        label: 'KL M 3',
        compareKey: 'bidPrice3',
      },
      {
        key: 'bidPrice2',
        label: 'Giá M 2',
        compareKey: 'bidPrice2',
      },
      {
        key: 'bidVol2',
        label: 'KL M 2',
        compareKey: 'bidPrice2',
      },
      {
        key: 'bidPrice1',
        label: 'Giá M 1',
        compareKey: 'bidPrice1',
      },
      {
        key: 'bidVol1',
        label: 'KL M 1',
        compareKey: 'bidPrice1',
      },
      {
        key: 'closePrice',
        label: 'Giá',
        compareKey: 'closePrice',
      },
      {
        key: 'closeVol',
        label: 'KL',
        compareKey: 'closePrice',
      },
      {
        key: this.isShowValueChange ? 'change' : 'stockPercentChange',
        label: this.isShowValueChange ? '+/-' : '%',
        onToogle: (event: Event) => {
          event.stopPropagation()

          this.isShowValueChange = !this.isShowValueChange;
          this.buildColumns();
        },
        compareKey: 'closePrice',
      },
      {
        key: 'offerPrice1',
        label: 'Giá B 1',
        compareKey: 'offerPrice1',
      },
      {
        key: 'offerVol1',
        label: 'KL B 1',
        compareKey: 'offerPrice1',
      },
      {
        key: 'offerPrice2',
        label: 'Giá B 2',
        compareKey: 'offerPrice2',
      },
      {
        key: 'offerVol2',
        label: 'KL B 2',
        compareKey: 'offerPrice2',
      },
      {
        key: 'offerPrice3',
        label: 'Giá B 3',
        compareKey: 'offerPrice3',
      },
      {
        key: 'offerVol3',
        label: 'KL B 3',
        compareKey: 'offerPrice3',
      },
      ...groupPrice2,
      {
        key: this.isShowQuantity ? 'quantity' : 'volume',
        label: this.isShowQuantity ? 'KL' : 'GTGD',
        onToogle: (event: Event) => {
          event.stopPropagation()

          this.isShowQuantity = !this.isShowQuantity;
          this.buildColumns();
        }
      },
    ]
  }

  handleSort(column: IColumn) {
    if (this.sortKey === column.key) {
      let _sortType: number = this.sortType + 1;

      if (_sortType > 1) {
        _sortType = 0;
        this.sortKey = '';
      } else {
        this.sortType = _sortType;
      }
    } else {
      this.sortKey = column.key;
      this.sortType = 0;
    } 
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;

    const _currentIndex = Math.floor(scrollTop / 28); // Assuming each row has a height of 50px

    this.currentIndex = _currentIndex;

    const maxIndex = _currentIndex + this.maxShowItems;

    const offset = Math.floor(this.maxShowItems / 2);
    let offsetTopIndex = _currentIndex - offset;

    if (offsetTopIndex < 0) {
      offsetTopIndex = 0;
    }

    let offsetBottomIndex = maxIndex + offset;

    if (offsetBottomIndex > this.priceboardData.length) {
      offsetBottomIndex = this.priceboardData.length;
    }

    this.minIndex = offsetTopIndex;
    this.maxIndex = offsetBottomIndex;
  }

  onSymbolSelected(event: MatAutocompleteSelectedEvent) {
    const selectedSymbol = event.option.value;

    const _currentIndex = this.listSymbols.indexOf(selectedSymbol);

    const scrollPosition = _currentIndex * 28; // Giả sử mỗi hàng cao 28px

    this.containerRef.nativeElement.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }

  getColorClassName(
    column: any,
    item: any,
  ): string {
    if (!column?.compareKey) return ''

    if (column.compareKey === "*") return ''

    const { reference, ceiling, floor } = item;

    const value = item[column.compareKey];

    if (value == reference) {
      return ' text-reference';
    }
    if (value >= ceiling) {
      return ' text-ceiling';
    }
    if (value <= floor) {
      return ' text-floor';
    }
    if (value > reference) {
      return ' text-up';
    }
    if (value < reference) {
      return ' text-down';
    }

    return '';
  }
}
