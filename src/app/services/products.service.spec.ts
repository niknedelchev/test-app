import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ProductsService);

      // Inject the http service and test controller for each test
      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
