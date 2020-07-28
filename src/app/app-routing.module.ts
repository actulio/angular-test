import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/cart', pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
