import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reply-rating-modal',
  templateUrl: './reply-rating-modal.component.html',
  styleUrls: ['./reply-rating-modal.component.scss'],
})
export class ReplyRatingModalComponent implements OnInit {

  replyReviewForm: FormGroup;

  constructor(
    private replyRatingModalCtrl: ModalController,
    public fb: FormBuilder
  ) {
    this.replyReviewForm = this.fb.group({
      'input-reply-review': new FormControl,
    })
  }

  ngOnInit() { }

  cancel() {
    return this.replyRatingModalCtrl.dismiss(null, 'cancel');
  }

  postReplyReview() {
    console.log('aa');

  }

}
