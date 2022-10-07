import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxToastService } from 'ngx-toast-notifier';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from 'src/app/pages/users/interfaces/user.interface';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl= 'http://localhost:8000/auth';
  private isloggedSubject=  new BehaviorSubject<boolean>(false);
  private currentUser= new BehaviorSubject<User>({name:'',  email:'', password:'', roles:[]});
  users:User[]=[];

  constructor(private http:HttpClient, private router:Router,private cartSvc:CartService, private ngxToastServ:NgxToastService) {
    
  }

  getIsLoggued$(): Observable<boolean>{
    return this.isloggedSubject.asObservable();
  }

  getCurrentUser$(): Observable<User>{
    return this.currentUser.asObservable();
  }

  register(user:User):Observable<any>{
    localStorage.setItem( 'usuario_registrado', JSON.stringify(user) );
    
    return this.http.post<any>(`${this.apiUrl}/register`, 
    {
      email:user.email,
      password:user.password,
      name:user.name,
      roles:['read']
    }).pipe(
      tap( ()=> {
        this.ngxToastServ.onSuccess('Usuario registrado', 'Usted se ha registrado correctamente en la plataforma');
        console.log('User registered...', user.name);
        this.router.navigate(['/auth/login']);
      } )
    );
    
  }

  login(user:User): Observable<any>{    
    return this.http.post<any>(`${this.apiUrl}/login`, 
    {
      email:user.email,
      password:user.password
    })
      .pipe(             
        tap(resData => {     
          console.log('User loged...', user.name);
          this.currentUser.next(user);
          this.isloggedSubject.next(true);
          localStorage.setItem('access_token', JSON.stringify(resData));
          localStorage.setItem('usuario_logueado', JSON.stringify(user));
          this.ngxToastServ.onSuccess(`Bienvenido`, 'Ya puede acceder a todas las funcionalidades de la plataforma');
          this.router.navigate(['/']);
        })
      );
  }

  logout():void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('usuario_logueado');
    this.currentUser.next({name:'',  email:'', password:'', roles:[]});
    this.isloggedSubject.next(false);

    this.ngxToastServ.onWarning(`Sesión cerrada`, 'Ha finalizado su sesión, podrá seguir en la plataforma pero no ejercer su compra!');
    this.cartSvc.resetCart();
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn():boolean {
    const userLoged = localStorage.getItem('usuario_logueado');
    return (userLoged !== null);
  }

  getHandleError(error: HttpErrorResponse) {
    let msg: string;
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      /* msg = `Error Code: ${error.status}\nMessage: ${error.message}`;*/
      if (error.status === 0) {
        msg = 'En este momento estamos presentando problemas técnicos';
      } else {
        msg = error.error.mens;
      }

    }
    return throwError(msg);
  }
}
