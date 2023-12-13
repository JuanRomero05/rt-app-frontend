import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModalComponent } from './card-modal.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CardModalComponent],
  exports: [CardModalComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CardModalModule { }
