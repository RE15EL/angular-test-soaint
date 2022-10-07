import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxToastService } from 'ngx-toast-notifier';
import { tap } from 'rxjs';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/interfaces/store.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { DataService } from 'src/app/shared/services/data.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isUserLogged!:boolean;
  qty$!:number ;

  addressForm = this.fb.group({
    name: [null, Validators.compose( [Validators.required, Validators.minLength(3)])],    
    PickupOrDelivery: ['pickup'],
    address: ['', Validators.compose( [Validators.required, Validators.minLength(3)])],
    city: ['', Validators.compose( [Validators.required, Validators.minLength(3)])],
  });
  //TODO: revisar pq no se importa el servicio de las Orders
  constructor(private fb: FormBuilder,
              private dataSvc:DataService,
              private authSvc:AuthService,
              private cartSvc:CartService,
              private orderSvc:OrderService,
              private router:Router,
              private ngxToastServ:NgxToastService) 
  {
    authSvc.getIsLoggued$().subscribe( res => this.isUserLogged=res);
  }

  ngOnInit(): void {
    this.cartSvc.qtyActions$.subscribe( qty => this.qty$= qty) ;
  }

  onSubmit(): void {
    // console.log(this.addressForm.value);
    if (this.isUserLogged) {
      const order:Order = {
        name:String(this.addressForm.value.name),
        shippingAddress:String(this.addressForm.value.address),
        city: String(this.addressForm.value.city),
        pickup:true,
        date: this.getCurrentDay()
      };
      this.orderSvc.saveOrder(order)
      .pipe(
        tap(
          (res) => {
            // console.log(res);
            this.ngxToastServ.onSuccess(`Compra satisfactoria `, 'Ha realizado el pago correctamente, su orden será procesada inmediatamente');
            this.cartSvc.resetCart();
          }  
        )
      )
      .subscribe();
      
    }else{
      // console.log('no logueado');
      this.ngxToastServ.onWarning(`Usuario no logueado`, 'Para poder realizar el pago antes debe estar legueado en de la plataforma');
      this.router.navigate(['/auth/login']);
    }
  }

  private getCurrentDay():string{
    return new Date().toLocaleDateString();
  }
}

