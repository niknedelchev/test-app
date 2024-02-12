import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { ProductsService } from '../services/products.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    productsServiceSpy = jasmine.createSpyObj('ProductsService', ['addProduct']);

    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: ProductsService, useValue: productsServiceSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
