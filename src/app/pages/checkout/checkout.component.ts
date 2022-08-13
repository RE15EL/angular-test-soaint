import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Store } from 'src/app/shared/interfaces/store.interface';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  stores:Store[] = [];
  isDelivery:boolean=false;

  addressForm = this.fb.group({
    name: [null, Validators.compose( [Validators.required, Validators.minLength(3)])],    
    PickupOrDelivery: ['pickup'],
    shippingAddress: ['', Validators.required],
    city: ['', Validators.compose( [Validators.required, Validators.minLength(4)])],
    store: ['', Validators.compose( [Validators.required, Validators.minLength(3)])],
  });
  
  constructor(private fb: FormBuilder, private dataSvc:DataService) {}

  onSubmit(): void {
    alert('Gracias por su compra!');
  }

  ngOnInit(): void {
    this.getStores();
  }

  onPickupOrDelivery(value:boolean):void{
    this.isDelivery=value;
  }

  private getStores():void{
    this.dataSvc.getStores()
    .pipe(
      tap( (stores:Store[]) => this.stores= stores  )
    )
    .subscribe();
  }

}

