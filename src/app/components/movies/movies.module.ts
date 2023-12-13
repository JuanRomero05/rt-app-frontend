import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { CardModalModule } from '../card-modal/card-modal.module';



@NgModule({
  imports: [
    CommonModule,
    CardModalModule
  ],
  declarations: [MoviesComponent],
  exports: [MoviesComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MoviesModule { }
