import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';


import { ProductsComponent } from './products.component';
import { ProductsService } from '../services/products.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardContentStub, MatCardHeaderStub, MatCardStub, MatCardSubTitleStub, MatCardTitleGroupStub, MatCardTitleStub, MatFormFieldStub, MatIconStub, MatLabelStub } from '../testing/test-utils';
import { EMPTY, of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsResponse } from '../contracts/products-response';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  template: '<div>Details for product {{prodId}}</div>'
})
class ProductDetailsStub {
  prodId: string;

  constructor(private location: Location) {
    this.prodId = location.path().replace('/products/', '').toString();
  }

}

@Component({
  template: '<router-outlet></router-outlet>'
})
class RootComponentStub {
  @ViewChild(RouterOutlet)
  routerOutlet!: RouterOutlet;

}


describe('ProductsComponent', () => {
  let rootComponent: RootComponentStub;
  let rootFixture: ComponentFixture<RootComponentStub>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;
  let router: Router;
  let location: Location;

  const initProducts = [
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
  ];

  const productsResponse: ProductsResponse = {
    products: initProducts,
    limit: 10,
    skip: 0,
    total: 1
  };

  beforeEach(async () => {
    productsServiceSpy = jasmine.createSpyObj('ProductService', ['getAllProducts', 'searchProducts'])
    productsServiceSpy.getAllProducts.and.returnValue(of(productsResponse))

    await TestBed.configureTestingModule({
      declarations: [RootComponentStub, ProductsComponent, ProductDetailsStub,
        MatFormFieldStub, MatLabelStub, MatIconStub,
        MatCardStub, MatCardHeaderStub, MatCardTitleGroupStub, MatCardTitleStub,
        MatCardSubTitleStub, MatCardContentStub],
      imports: [RouterTestingModule.withRoutes(
        [
          { path: '', component: ProductsComponent, pathMatch: 'full' },
          { path: 'products/:productId', component: ProductDetailsStub }
        ]), ReactiveFormsModule],
      providers: [{ provide: ProductsService, useValue: productsServiceSpy }]
    })
      .compileComponents();

    rootFixture = TestBed.createComponent(RootComponentStub);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    rootComponent = rootFixture.componentInstance;
    router.initialNavigation();
    await rootFixture.whenStable().then(() => rootFixture.detectChanges());
  });

  it('should create', () => {
    expect(rootComponent).toBeTruthy();
  });

  it('should contain two cards', fakeAsync(() => {
    let cards = rootFixture.debugElement.queryAll(By.css('mat-card'));
    expect(cards.length).toBe(2);
  }));

  it('should contain cards with exact product details', () => {
    let cards = rootFixture.debugElement.queryAll(By.css('mat-card'));
    let { products } = productsResponse;

    for (let i = 0; i < cards.length; i++) {
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

  it('should display product one when the product is found', () => {
    //arrange
    let productsComponent = rootComponent.routerOutlet.component as ProductsComponent;
    let newProductsResponse = Object.assign({}, productsResponse);
    newProductsResponse.products = [...productsResponse.products];
    let { products } = newProductsResponse;
    newProductsResponse.products.pop();

    productsServiceSpy.searchProducts.and.returnValue(of(newProductsResponse));

    //act
    productsComponent.sumbitSearch();
    rootFixture.detectChanges();

    //assert
    let cardDEArr = rootFixture.debugElement.queryAll(By.css('mat-card'));
    expect(cardDEArr.length).toBe(1);

    let textContent = cardDEArr[0].nativeElement.textContent;
    expect(textContent).toContain(products[0].id);
    expect(textContent).toContain(products[0].description);
    expect(textContent).toContain(products[0].category);
    expect(textContent).toContain(products[0].description);
    expect(textContent).toContain(products[0].discountPercentage);
    expect(textContent).toContain(products[0].price);

  })

  it('should display no product when the product is not found', () => {
    //arrange
    let productsComponent = rootComponent.routerOutlet.component as ProductsComponent;
    let newProductsResponse = Object.assign({}, productsResponse);
    newProductsResponse.products = [];

    productsServiceSpy.searchProducts.and.returnValue(of(newProductsResponse));
    productsComponent.sumbitSearch();
    rootFixture.detectChanges();

    //act
    let cardDEArr = rootFixture.debugElement.queryAll(By.css('mat-card'));

    //assert
    expect(cardDEArr.length).toBe(0);
  })

  it('should navigate to correct product details by id', async () => {
    //arrange
    let prodId = 1;
    let productsComponent = rootComponent.routerOutlet.component as ProductsComponent;

    //act
    productsComponent.getProductDetails(prodId);
    await rootFixture.whenStable().then(() => rootFixture.detectChanges());

    let actualSubPath = location.path().replace('/products/', '').toString();
    let actualDE = rootFixture.debugElement.query(By.css('div'));
    let actualElem: HTMLElement = actualDE.nativeElement;

    //assert
    expect(actualSubPath).toBe(prodId.toString());
    expect(actualElem.textContent).toEqual('Details for product ' + prodId);

  })


  it('should navigate to correct product details by id - another way', fakeAsync(() => {
    //arrange
    let prodId = 1;
    let productsComponent = rootComponent.routerOutlet.component as ProductsComponent;

    //act
    productsComponent.getProductDetails(prodId);
    tick()
    rootFixture.detectChanges();

    let actualSubPath = location.path().replace('/products/', '').toString();
    let actualDE = rootFixture.debugElement.query(By.css('div'));
    let actualElem: HTMLElement = actualDE.nativeElement;

    //assert
    expect(actualSubPath).toBe(prodId.toString());
    expect(actualElem.textContent).toEqual('Details for product ' + prodId);
  }))


});
