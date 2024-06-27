import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShitesComponent } from './add-shites.component';

describe('AddShitesComponent', () => {
  let component: AddShitesComponent;
  let fixture: ComponentFixture<AddShitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
