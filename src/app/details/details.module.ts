import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { FormComponent } from './component/form/form.component';
import { DetailComponent } from './component/detail/detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [FormComponent, DetailComponent],
  // providers: [FormComponent],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class DetailsModule { }
