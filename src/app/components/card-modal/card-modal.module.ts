import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModalComponent } from './card-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewsModule } from '../reviews/reviews.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReviewsModule,
  ],
  declarations: [CardModalComponent],
  exports: [CardModalComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CardModalModule { }
