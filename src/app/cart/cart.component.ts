import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';

export interface AddedProducts extends Product {
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  products: AddedProducts[];
  total: number;
  addForm = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.pattern('[0-9]*'),
    ]),
    quantity: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.pattern('[0-9]*'),
    ]),
  });

  ngOnInit(): void {
    this.products = [];
    this.total = 0;
  }

  addProduct(): void {
    const id = this.addForm.controls['id'].value;
    this.getProduct(id);
  }

  getProduct(id: number) {
    const quantity = this.addForm.controls['quantity'].value;
    return this.productsService.getProduct(id).subscribe((product) => {
      if (product) {
        const productIdx = this.products.findIndex((e) => e.id === id);
        if (productIdx !== -1) {
          this.products[productIdx].quantity += quantity;
        } else {
          this.products.push({ ...product, quantity });
        }
        this.total = this.calculateTotal();
      } else {
        console.log('produto nao encontrado');
      }
    });
  }

  calculateTotal() {
    return this.products.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  }
}
