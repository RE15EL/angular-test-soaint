import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxToastService } from 'ngx-toast-notifier';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from 'src/app/pages/users/interfaces/user.interface';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl= 'http://localhost:3200';
  private isloggedSubject=  new BehaviorSubject<boolean>(false);
  currentUser= new BehaviorSubject<User>({name:'',  email:'', pass:'', roles:['read']});
  users:User[]=[];

  constructor(private http:HttpClient, private router:Router,private cartSvc:CartService, private ngxToastServ:NgxToastService) {
    this.getUsers().subscribe( res => this.users = res);
  }

  get isLoggued$(): Observable<boolean>{
    return this.isloggedSubject.asObservable();
  }

  get currentUser$(): Observable<User>{
    return this.currentUser.asObservable();
  }

  register(user:User):Observable<any>{
    localStorage.setItem( 'usuario_registrado', JSON.stringify(user) );
    this.ngxToastServ.onSuccess('Usuario registrado', 'Usted se ha registrado correctamente en la plataforma');
    return this.http.post<any>(`${this.apiUrl}/users`, 
    {
      name: user.name,
      email:user.email,
      pass:user.pass
    }).pipe(
      tap( ()=> {
        this.router.navigate(['/auth/login']);
      } )
    );
    
  }
  login(user:User){    
    const nextUser= this.users.find( ({email,pass}) => (user.email == email) && (user.pass == pass) ); 
    if ( !nextUser ) {
      this.ngxToastServ.onDanger('Usuario no registrado', 'Por favor realice su registro para que pueda acceder a todas las funcionalidades de la plataforma');
      this.router.navigate(['/auth/register']);
    }else{
      this.ngxToastServ.onSuccess(`Bienvenido ${user.name}`, 'Ya puede acceder a todas las funcionalidades de la plataforma');
      this.currentUser.next(nextUser);
      this.isloggedSubject.next(true);
      localStorage.setItem( 'user_logged', JSON.stringify(nextUser));
      this.router.navigate(['/']);
    }
  }

  logout():void {
    this.ngxToastServ.onWarning(`Sesión cerrada`, 'Ha finalizado su sesión, podrá seguir en la plataforma pero no ejercer su compra!');
    localStorage.removeItem('user_logged');
    this.currentUser.next({name:'',  email:'', pass:'', roles:['read']});
    this.isloggedSubject.next(false);
    this.cartSvc.resetCart();
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn():boolean {
    const userData = localStorage.getItem('user_logged');
    return (userData !== null);
  }
  
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getCurrentUser(){
    return this.currentUser;
  }
}
