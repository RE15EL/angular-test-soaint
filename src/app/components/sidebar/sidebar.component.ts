import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CartService } from 'src/app/shared/services/cart.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/pages/users/interfaces/user.interface';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { selectLoading } from 'src/app/state/selectors/products.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  currentUserLogged$ = this.authSvc.getCurrentUser$(); 
  isUserLogged$= this.authSvc.getIsLoggued$();
  loading$:Observable<boolean>= new Observable();  
  qty:number=0;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private cartSvc:CartService,
              private authSvc:AuthService,
              private store:Store<AppState>)
  {
    cartSvc.qtyActions$.subscribe( res => this.qty= res);
    this.loading$= this.store.select( selectLoading);
  }


  logout():void{
    this.authSvc.logout();
  }
}
