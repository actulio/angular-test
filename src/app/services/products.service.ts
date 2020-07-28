import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'api/products';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.apiUrl)
      .pipe(catchError(this.handleError<Product[]>('getProducts', [])));
  }
  getProduct(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Product>(url)
      .pipe(catchError(this.handleError<Product>(`getProduct id=${id}`)));
  }
  addProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.apiUrl, product, this.httpOptions)
      .pipe(catchError(this.handleError<Product>('addProduct')));
  }

  updateProduct(product: Product): Observable<any> {
    return this.http
      .put(this.apiUrl, product, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateProduct')));
  }
  deleteProduct(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;

    return this.http
      .delete<Product>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Product>('deleteProduct')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
