import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog
  ) {}
  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns = ['quantity', 'id', 'name', 'price', 'options'];
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
    this.products = [
      { quantity: 1, id: 1, name: 'Arroz', price: 2 },
      { quantity: 1, id: 2, name: 'Macarrao', price: 3.5 },
      { quantity: 1, id: 3, name: 'Feijao', price: 4.56 },
      { quantity: 1, id: 4, name: 'Carne', price: 12.0 },
      { quantity: 1, id: 5, name: 'Frango', price: 25.56 },
      { quantity: 1, id: 6, name: 'Farofa', price: 1.23 },
      { quantity: 1, id: 7, name: 'Farofa', price: 1.23 },
      { quantity: 1, id: 8, name: 'Farofa', price: 1.23 },
      { quantity: 1, id: 9, name: 'Farofa', price: 1.23 },
    ];
  }

  addProduct(): void {
    const id = this.addForm.controls['id'].value;
    this.getProduct(id);
  }

  getProduct(id: number) {
    const quantity = this.addForm.controls['quantity'].value;
    return this.productsService.getProduct(id).subscribe((product) => {
      if (product) {
        const productIdx = this.products.findIndex((e) => e.id == id);
        if (productIdx !== -1) {
          this.products[productIdx].quantity += quantity;
        } else {
          this.products.push({ ...product, quantity });
        }
        this.total = this.calculateTotal();
        this.table.renderRows();
        this.addForm.reset();
      } else {
        this.openDialog(id);
      }
    });
  }

  removeProduct(id: number) {
    this.products.splice(id, 1);
    this.total = this.calculateTotal();
    this.table.renderRows();
  }

  private calculateTotal() {
    return this.products.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  }

  private openDialog(id: number) {
    this.dialog.open(NotFoundDialog, {
      data: {
        id,
      },
    });
  }
}

@Component({
  selector: 'not-found-dialog',
  templateUrl: 'not-found-dialog.html',
})
export class NotFoundDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }) {}
}
