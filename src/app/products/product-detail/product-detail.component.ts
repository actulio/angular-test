import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from '../../interfaces/product';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  isDataLoaded: boolean;
  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.isDataLoaded = false;
    this.getHero().add(() => {
      this.editForm.setValue({
        name: this.product.name,
        price: this.product.price,
      });
      this.isDataLoaded = true;
    });
  }

  getHero() {
    const id = +this.route.snapshot.paramMap.get('id');
    return this.productsService
      .getProduct(id)
      .subscribe((product) => (this.product = product));
  }
  save(): void {
    console.log(this.product);
    this.productsService
      .updateProduct(this.product)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}
