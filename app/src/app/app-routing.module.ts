import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './pages/default/default.component';
import { DetailComponent } from './pages/detail/detail.component';


const routes: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'country/:code', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
