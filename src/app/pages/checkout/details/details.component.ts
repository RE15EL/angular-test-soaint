import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  total$ = this.CartSvc.totalActions$;
  cart$= this.CartSvc.cartActions$;
  
  constructor( private CartSvc: CartService) { }

  ngOnInit(): void {
  }
  deleteProd(id:number):void{
    this.CartSvc.delProdById(id);
  }
}
