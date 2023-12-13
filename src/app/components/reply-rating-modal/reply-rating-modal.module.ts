import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReplyRatingModalComponent } from './reply-rating-modal.component';
import { ReviewsModule } from '../reviews/reviews.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ReplyRatingModalComponent],
  exports: [ReplyRatingModalComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ReplyRatingModalModule { }
