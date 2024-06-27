import { ComponentFixture, TestBed } from '@angular/core/testing';

import {SellerListComponent} from './seller.component';

describe('SellerComponent', () => {
  let component: SellerListComponent;
  let fixture: ComponentFixture<SellerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
