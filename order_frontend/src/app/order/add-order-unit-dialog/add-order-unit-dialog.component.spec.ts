import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderUnitDialogComponent } from './add-order-unit-dialog.component';

describe('AddOrderUnitDialogComponent', () => {
  let component: AddOrderUnitDialogComponent;
  let fixture: ComponentFixture<AddOrderUnitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrderUnitDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrderUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
