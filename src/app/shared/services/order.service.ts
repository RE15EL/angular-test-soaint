import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetailsOrders } from '../interfaces/details-orders.interface';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor( private http:HttpClient) { }

  saveOrder(order:Order):Observable<Order> {
    return this.http.post<Order>(  `${environment.api}/orders`, order );
  }

  saveDetailsOrder(details:DetailsOrders):Observable<DetailsOrders>{
    return this.http.post<DetailsOrders>(  `${environment.api}/detailsOrders`, details );
  }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>( `${environment.api}/orders`);
  }
}
