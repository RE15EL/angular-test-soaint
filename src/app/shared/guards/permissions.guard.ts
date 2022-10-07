import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgxToastService } from 'ngx-toast-notifier';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
  isUserLogged !:boolean;
  isAdmin:boolean = false;

  constructor( private authSvc:AuthService, private ngxToastServ:NgxToastService, private router:Router){
    authSvc.getIsLoggued$().subscribe( res => this.isUserLogged=res);
  }

  canActivate():Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    if (this.isUserLogged && this.isAdmin) {
      return true;
    }else{
      this.ngxToastServ.onDanger('','No tiene permisos para navegar a esta zona de la plataforma');
      this.router.navigate(['/']);
      return false;
    }
    
  }
  
}
