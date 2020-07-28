import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
      { id: 1, name: 'Arroz', price: 10, },
      { id: 2, name: 'Macarrao', price: 10 },
      { id: 3, name: 'Feijao', price: 10, },
      { id: 4, name: 'Carne', price: 10, },
      { id: 5, name: 'Frango', price: 10, },
      { id: 6, name: 'Farofa', price: 10, },
    ];
    return { products };
  }

  // Overrides the genId method to ensure that a product always has an id.
  // If the products array is empty,
  // the method below returns the initial number (11).
  // if the products array is not empty, the method below returns the highest
  // product id + 1.
  genId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
  }
}
