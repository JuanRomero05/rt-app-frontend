import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepliesComponent } from './replies.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RepliesComponent],
  exports: [RepliesComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class RepliesModule { }
