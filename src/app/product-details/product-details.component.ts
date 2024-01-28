import { Component, OnInit } from '@angular/core';
import { Product } from '../contracts/product';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product?: Product; 
  productId!: number;

  constructor(private route: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit(): void {
    console.log(this.route);
   
    this.route.params
    .subscribe(params => this.productId = params['productId']);

    this.productsService.getSingleProduct(this.productId)
      .subscribe(res => this.product = res);
  }

}
