import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductsService } from '../services/products.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardContentStub, MatCardHeaderStub, MatCardStub, MatCardSubTitleStub, MatCardTitleGroupStub, MatCardTitleStub, MatFormFieldStub, MatIconStub, MatLabelStub } from '../testing/test-utils';
import { EMPTY, of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsResponse } from '../contracts/products-response';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  const productsResponse: ProductsResponse = {
    products: [
      {
        id: 1, brand: 'brand1', category: 'category1', description: 'description1',
        discountPercentage: 0, price: 100, stock: 2, rating: 10, title: 'title1',
        thumbnail: 'thumbnail1', images: ['imageUrl1']
      },
      {
        id: 2, brand: 'brand2', category: 'category2', description: 'description2',
        discountPercentage: 0, price: 200, stock: 1, rating: 8, title: 'title2',
        thumbnail: 'thumbnail2', images: ['imageUrl2']
      }
    ],
    limit: 10,
    skip: 0,
    total: 1
  };

  beforeEach(async () => {
    productsServiceSpy = jasmine.createSpyObj('ProductService', ['getAllProducts', 'searchProducts'])
    productsServiceSpy.getAllProducts.and.returnValue(of(productsResponse))

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, MatFormFieldStub, MatLabelStub, MatIconStub, 
        MatCardStub, MatCardHeaderStub, MatCardTitleGroupStub, MatCardTitleStub, MatCardSubTitleStub, MatCardContentStub],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: ProductsService, useValue: productsServiceSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain two cards', ()=>{
    let cards = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(cards.length).toBe(2);
  })

  it('should contain cards with exact product details', ()=>{
    let cards = fixture.debugElement.queryAll(By.css('mat-card'));
    let {products} = productsResponse;
    
    for(let i=0; i<cards.length; i++){
      let cardNative: HTMLElement = cards[i].nativeElement;
      let textContent = cardNative.textContent;
      console.log(textContent);
      expect(textContent).toContain(products[i].id);
      expect(textContent).toContain(products[i].description);
      expect(textContent).toContain(products[i].category);
      expect(textContent).toContain(products[i].description);
      expect(textContent).toContain(products[i].discountPercentage);
      expect(textContent).toContain(products[i].price);
      //add the rest
    }
  })


});
