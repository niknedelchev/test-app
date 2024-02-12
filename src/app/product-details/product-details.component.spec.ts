import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { ProductsService } from '../services/products.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{provider: ProductsService, useValue: productsServiceSpy}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
