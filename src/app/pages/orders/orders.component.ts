import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders:Order[]=[];

  constructor(private orderSvc:OrderService) { }

  ngOnInit(): void {
    this.orderSvc.getOrders()
      .subscribe( res => this.orders = res);
  }

}
