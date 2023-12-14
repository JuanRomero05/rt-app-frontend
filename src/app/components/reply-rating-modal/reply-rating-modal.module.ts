import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReplyRatingModalComponent } from './reply-rating-modal.component';
import { RepliesModule } from '../replies/replies.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RepliesModule
  ],
  declarations: [ReplyRatingModalComponent],
  exports: [ReplyRatingModalComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ReplyRatingModalModule { }
