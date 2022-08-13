import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "src/app/pages/products/interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products:Product[]=[];

  private cartSubject= new BehaviorSubject<Product[]>(this.products);
  private qtySubject= new BehaviorSubject<number>(0);
  private totaltSubject= new BehaviorSubject<number>(0);        
  
  constructor() { }
  
  //obtener los obserables
  get cartActions$(): Observable<Product[]>{
    return this.cartSubject.asObservable();
  }
  get qtyActions$(): Observable<number>{
    return this.qtySubject.asObservable();
  }
  get totalActions$(): Observable<number>{
    return this.totaltSubject.asObservable();
  }

  //agregar un producto al carrito
  private addToCart(prod:Product):void{
    const prodAux= this.products.find( ( {id} ) => prod.id === id ); //buscar si ya existe el producto
    if (prodAux) {
      prodAux.qty+=1;
    } else {
      this.products.push({...prod,qty:1}); 
    }
    this.cartSubject.next(this.products);
  }

  //obtener cantidad de productos
  private getQty():void{
    const qtyP= this.products.reduce( (cant, prod)=>cant+=prod.qty,0 );
    this.qtySubject.next(qtyP);
  }
  //obtener precio total
  private getTotalPrice():void{
    const total= this.products.reduce( (totalP, prod) => totalP+=(prod.price*prod.qty), 0);
    this.totaltSubject.next(total);
  }

  //actualizar el carrito
  updateCart(product:Product):void{
    this.addToCart(product);
    this.getQty();
    this.getTotalPrice();
  }  
}
