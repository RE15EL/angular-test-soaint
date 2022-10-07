import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  total$ = this.cartSvc.totalActions$;
  cart$= this.cartSvc.cartActions$;
  qty$= this.cartSvc.qtyActions$;

  constructor( private cartSvc: CartService) { }

  ngOnInit(): void {    
    
  }
  deleteProd(id:number):void{
    this.cartSvc.delProdById(id);
  }
}
