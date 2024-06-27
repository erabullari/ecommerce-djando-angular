import { TestBed } from '@angular/core/testing';

import { UserService } from './user-register.service';
import {RegisterComponent} from "./user-register.component";

describe('UserService', () => {
  let service: RegisterComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
