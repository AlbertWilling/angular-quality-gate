import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SightsComponent} from './sights/sights.component';
import {SightsListComponent} from './sights-list/sights-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/sights', pathMatch: 'full'},
  {path: 'sights', component: SightsComponent},
  {path: 'sights-list', component: SightsListComponent},
  {path: 'sight',
    loadChildren: () => import('./details/details-routing.module').then(m => m.DetailsRoutingModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
