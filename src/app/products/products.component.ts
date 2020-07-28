import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
  FormArray,
} from '@angular/forms';

import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  displayedColumns: string[] = ['id', 'name', 'price', 'options'];
  isDataLoaded: boolean;
  products: Product[];

  ngOnInit(): void {
    this.isDataLoaded = false;
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(products);
      this.isDataLoaded = true;
    });
  }
  delete(product: Product): void {
    this.products = this.products.filter((e) => e !== product);
    this.productsService.deleteProduct(product.id).subscribe();
  }
}
