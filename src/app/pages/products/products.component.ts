import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, Observable,tap } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { loadedProducts, loadProducts } from 'src/app/state/actions/products.action';

import { AppState } from 'src/app/state/app.state';
import { selectLoading, selectProductsList } from 'src/app/state/selectors/products.selectors';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  //products:Product[]=[];

  products$:Observable<any>= new Observable();
  loading$:Observable<boolean>= new Observable();

  constructor( private productsSvc:ProductsService, private cartSvc:CartService, private store:Store<AppState>) { }

  ngOnInit(): void {
    // this.productsSvc.getProducts()
    // .pipe
    // (
    //   tap( (products:Product[]) => this.products=products )      
    // )
    // .subscribe();
    
    //TODO: NGRX
    this.store.dispatch( loadProducts() ); //disparar la accion loadProducts()
    
    this.productsSvc.getProducts()
    .pipe(
      delay(1500)
    )
    .subscribe( (res:Product[])=> { 
      //console.log(res);
      this.store.dispatch( loadedProducts( { products: res } ) );
    } );

    this.loading$= this.store.select( selectLoading);
    this.products$= this.store.select( selectProductsList);

  }
  
  addToCart(product:Product):void{
    this.cartSvc.updateCart(product);  
    console.log('producto', product);      
  }
}
