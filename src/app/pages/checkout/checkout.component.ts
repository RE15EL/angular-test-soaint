import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/interfaces/store.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  stores:Store[] = [];
  isUserLogged!:boolean;
  qty$!:number ;

  addressForm = this.fb.group({
    name: [null, Validators.compose( [Validators.required, Validators.minLength(3)])],    
    PickupOrDelivery: ['pickup'],
    address: ['', Validators.compose( [Validators.required, Validators.minLength(3)])],
    city: ['', Validators.compose( [Validators.required, Validators.minLength(3)])],
  });
  
  constructor(private fb: FormBuilder,
              private dataSvc:DataService,
              private authSvc:AuthService,
              private cartSvc:CartService,
              private router:Router) 
  {
    authSvc.isLoggued$.subscribe( res => this.isUserLogged=res);
  }

  ngOnInit(): void {
    this.getStores();
    this.cartSvc.qtyActions$.subscribe( qty => this.qty$= qty) ;
  }

  onSubmit(): void {
    console.log(this.addressForm.value);
    if (this.isUserLogged) {
      console.log('logueado');      
    }else{
      console.log('no logueado');
      this.router.navigate(['/auth/login']);
    }
    //enviar datos a la API

  }

  private getCurrentDay():string{
    return new Date().toLocaleDateString();
  }

  private getStores():void{
    this.dataSvc.getStores()
    .pipe(
      tap( (stores:Store[]) => this.stores= stores  )
    )
    .subscribe();
  }

}

