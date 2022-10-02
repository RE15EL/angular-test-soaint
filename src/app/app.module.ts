import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProductsModule } from './pages/products/products.module';


//angular material module, ngbootstrap y NgxToastNotifierModule
import { MaterialModule } from './shared/material.module';
import { NgBootstrapModule } from './shared/ng-bootstrap.module';
import { NgxToastNotifierModule } from 'ngx-toast-notifier';


import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CartComponent } from './shared/components/cart/cart.component';
import { TimePickerComponent } from './shared/components/time-picker/time-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HoursDirectiveDirective } from './shared/directives/hours-directive.directive';

//ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ROOT_REDUCERS } from './state/app.state';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CartComponent,
    TimePickerComponent,
    HoursDirectiveDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgBootstrapModule,
    NgxToastNotifierModule.forRoot(),
    ProductsModule,
    FormsModule, 
    ReactiveFormsModule,
    StoreModule.forRoot( ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
