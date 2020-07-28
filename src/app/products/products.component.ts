import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';

import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  @ViewChild(MatTable) table: MatTable<any>;
  displayedColumns: string[] = ['id', 'name', 'price', 'options'];
  isDataLoaded: boolean;
  panelOpenState: boolean;
  newProduct: {
    name: string;
    price: number;
  };
  products: Product[];

  addForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.isDataLoaded = false;
    this.panelOpenState = false;
    this.newProduct = {
      name: '',
      price: null,
    };
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
  create(): void {
    const name = this.newProduct.name.trim();
    const price = this.newProduct.price;
    if (!name) {
      return;
    }
    this.productsService
      .addProduct(({ name, price } as unknown) as Product)
      .subscribe((product) => {
        this.products.push(product);
        this.handleResetForm();
      });
  }

  private handleResetForm(): void {
    this.panelOpenState = false;
    this.newProduct = {
      name: '',
      price: null,
    };
    this.addForm.reset();
    this.table.renderRows();
  }
}
