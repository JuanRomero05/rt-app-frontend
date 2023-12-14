import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { createComment } from 'src/api/resources/comments';
import { getCommentsByReview } from 'src/api/resources/reviews';
import { getUserById } from 'src/api/resources/users';

@Component({
  selector: 'app-reply-rating-modal',
  templateUrl: './reply-rating-modal.component.html',
  styleUrls: ['./reply-rating-modal.component.scss'],
})
export class ReplyRatingModalComponent implements OnInit {

  @Input() Review: any

  replyReviewForm: FormGroup;
  replies: any[] = []
  user: any

  constructor(
    private replyRatingModalCtrl: ModalController,
    public fb: FormBuilder
  ) {
    this.replyReviewForm = this.fb.group({
      'input-reply-review': new FormControl,
    })
  }

  async ngOnInit() {
    let request = await getCommentsByReview(this.Review.id)
    this.replies = request.data
    request = await getUserById(this.Review.userId)
    this.user = request.data
  }

  cancel() {
    return this.replyRatingModalCtrl.dismiss(null, 'cancel');
  }

  async postReplyReview() {
    const review = await createComment({
      userId: this.user.id,
      reviewId: this.Review.id,
      content: this.replyReviewForm.controls['input-reply-review'].value
    })
    this.replyReviewForm.controls['input-reply-review'].setValue('')
    this.replies.push(review.data)
  }

  setDate(date: string){
    const year = new Date(date).getFullYear().toString()
    const month = new Date(date).getMonth().toString()
    const day = new Date(date).getDay().toString()
    return `${month}/${day}/${year}`
  }

}
