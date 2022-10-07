import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhitoutSaveGuard } from 'src/app/shared/guards/whitout-save.guard';
import { CheckoutComponent } from './checkout.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'cart-details', component: DetailsComponent },
  { path: '', component: CheckoutComponent,  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
