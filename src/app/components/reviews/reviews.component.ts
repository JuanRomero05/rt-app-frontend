import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReplyRatingModalComponent } from '../reply-rating-modal/reply-rating-modal.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {

  constructor(private replyRatingModalCtrl: ModalController) { }

  ngOnInit() { }

  async openReplyRatingModal() {
    const modal = await this.replyRatingModalCtrl.create({
      component: ReplyRatingModalComponent
    })
    modal.present();
  }

}
