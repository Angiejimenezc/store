import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from './interface/product.interface';
import { ProductsService } from './services/products.service';
import { ShoppingCartService } from '../../shared/services/shopping_cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products!: Product[];

  constructor(
    private productSvc: ProductsService,
    private shoppingCartSvc: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.productSvc
      .getProducts()
      .pipe(tap((products: Product[]) => (this.products = products)))
      .subscribe();
  }

  addToCart(product: Product): void {
    this.shoppingCartSvc.updateCart(product);
    console.log(product);
  }
}
