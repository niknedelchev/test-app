import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../contracts/product';
import { ProductsResponse } from '../contracts/products-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsUrl = 'https://dummyjson.com/products';


  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(this.productsUrl);
  }

  searchProducts(searchTerm: string): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(this.productsUrl + '/search?q=' + searchTerm);
  }

  getSingleProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(this.productsUrl + '/' + productId);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl + '/add', product);
  }
}
