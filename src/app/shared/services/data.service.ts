import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '../interfaces/store.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL=environment.api;
  constructor(private http:HttpClient) { }

  getStores():Observable<Store[]>{
    return this.http.get<Store[]>( `${this.apiURL}/stores`);
  }
}
