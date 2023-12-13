import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './reviews.component';
import { ReplyRatingModalModule } from '../reply-rating-modal/reply-rating-modal.module';



@NgModule({
  imports: [
    CommonModule,
    ReplyRatingModalModule
  ],
  declarations: [ReviewsComponent],
  exports: [ReviewsComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ReviewsModule { }
