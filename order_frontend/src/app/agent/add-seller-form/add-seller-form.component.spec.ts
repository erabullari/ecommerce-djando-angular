import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSellerFormComponent } from './add-seller-form.component';

describe('AddSellerFormComponent', () => {
  let component: AddSellerFormComponent;
  let fixture: ComponentFixture<AddSellerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSellerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSellerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
