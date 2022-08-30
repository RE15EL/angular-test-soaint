import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CartService } from 'src/app/shared/services/cart.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  time = {hour: 12, minute: 30};
  isUserLogged!:boolean;
  qty:number=0;
  userLogged$ = this.authSvc.currentUser$;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private cartSvc:CartService,
              private authSvc:AuthService)
  {
    cartSvc.qtyActions$.subscribe( res => this.qty= res);
    authSvc.isLoggued$.subscribe( res => this.isUserLogged=res);
  }

  logout():void{
    this.authSvc.logout();
  }
}
