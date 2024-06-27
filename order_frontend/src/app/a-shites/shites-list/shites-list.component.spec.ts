import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShitesListComponent } from './shites-list.component';

describe('ShitesListComponent', () => {
  let component: ShitesListComponent;
  let fixture: ComponentFixture<ShitesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShitesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShitesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
