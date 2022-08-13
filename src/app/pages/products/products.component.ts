import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!:Product[];

  constructor( private productsSvc:ProductsService, private cartSvc:CartService) { }

  ngOnInit(): void {
    this.productsSvc.getProducts()
    .pipe
    (
      tap( (products:Product[]) => this.products=products )      
    )
    .subscribe();
  }
  
  addToCart(product:Product):void{
    this.cartSvc.updateCart(product);  
    console.log('producto', product);      
  }
}
