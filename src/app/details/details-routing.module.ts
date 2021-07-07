import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailComponent} from './component/detail/detail.component';
import {FormComponent} from './component/form/form.component';

const routes: Routes = [
  {path: 'add', component: FormComponent},
  {path: 'details', component: DetailComponent},
  // {path: 'edit/?longitude=longitude&latitude=latitude', component: FormComponent},
  {path: 'edit/:longitude/:latitude', component: FormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
