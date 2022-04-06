import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/pages/products/interface/product.interface';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  products: Product[] = [];

  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

  get totalAction$(): Observable<number> {
    return this.totalSubject.asObservable();
  }
  get quantityAction$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }
  get cartAction$(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  //Metodo que llamara a addTocart y actualiza cantidades y llamar el total
  public updateCart(product: Product): void {
    this.addToCart(product);
    this.quantityProducts();
    this.calcTotal();
  }

  //Metodo addCart
  private addToCart(product: Product): void {
    this.products.push(product);
    this.cartSubject.next(this.products);
    console.log(product);
  }
  //Metodo para saber quantity

  private quantityProducts(): void {
    const quantity = this.products.length;
    this.quantitySubject.next(quantity);
    console.log(quantity);
  }
  //Metodo que calcula total - Uso Reduce para hacer el calculo

  private calcTotal(): void {
    const total = this.products.reduce((acc, prod) => (acc += prod.price), 0);
    this.totalSubject.next(total);
    console.log(total);
  }
}
