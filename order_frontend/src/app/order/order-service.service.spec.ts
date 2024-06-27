import { TestBed } from '@angular/core/testing';
import { OrderService } from './order-service.service';

describe('OrderServiceService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService] // Add the service as a provider here
    });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
