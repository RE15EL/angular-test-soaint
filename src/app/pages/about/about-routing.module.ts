import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from 'src/app/shared/guards/permissions.guard';
import { AboutComponent } from './about.component';

const routes: Routes = [
  { path: '', component: AboutComponent,}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
