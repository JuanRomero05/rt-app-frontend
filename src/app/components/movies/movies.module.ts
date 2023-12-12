import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MoviesComponent],
  exports: [MoviesComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MoviesModule { }
