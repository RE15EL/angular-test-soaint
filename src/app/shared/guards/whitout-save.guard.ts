import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WhitoutSaveGuard implements CanActivate, CanDeactivate<unknown> {
  isUserLogged !:boolean;
  
constructor(private authSvc:AuthService){
  authSvc.isLoggued$.subscribe( res => this.isUserLogged=res);
}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if( this.isUserLogged ){
        return true;
      }else{
        return confirm('Puede ser que tenga cambios sin guardar, por favor revise!')
      }
  }
  
}
