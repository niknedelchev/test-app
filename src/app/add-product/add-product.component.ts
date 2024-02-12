import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Product } from '../contracts/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  fileList: File[] = [];
  productForm!: FormGroup;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      discountPercentage: new FormControl(''),
      rating: new FormControl(''),
      stock: new FormControl(''),
      brand: new FormControl(''),
      category: new FormControl(''),
      thumbnail: new FormControl(''),
      images: new FormControl('')
    })
  }

  addFiles($event: Event) {
    const target = event?.target;
    const files = (target as HTMLInputElement).files;

    if (files) {
      this.fileList = Array.from(files);
    }

  }

  addProduct() {
    let product: Product = this.productForm.value;
    product.images = this.fileList;
    this.productService.addProduct(product).subscribe({
      next: res => {
        console.log("successfuly added product.");
        console.log(res);
      },
      error: err => console.log(err)
    })

    this.productForm.reset();

  }

}
