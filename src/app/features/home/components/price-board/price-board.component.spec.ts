import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceBoardComponent } from './price-board.component';

describe('PriceBoardComponent', () => {
  let component: PriceBoardComponent;
  let fixture: ComponentFixture<PriceBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
