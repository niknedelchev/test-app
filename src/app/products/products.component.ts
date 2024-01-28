import { Component, OnInit } from '@angular/core';
import { Product } from '../contracts/product';
import { ProductsService } from '../services/products.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: Product[] | undefined;
  searchForm!: FormGroup;

  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(res => {
      console.log(res);
      this.products = res.products;
    });

    this.searchForm = new FormGroup({
      searchTerm: new FormControl('')
    })
  }

  sumbitSearch() {
    this.productService.searchProducts(this.searchForm.value.searchTerm)
      .subscribe(res => this.products = res.products);
    this.searchForm.reset();
  }

  getProductDetails(productId: number): void {
    this.router.navigateByUrl(`products/${productId}`);
  }


}
