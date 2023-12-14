import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReplyRatingModalComponent } from '../reply-rating-modal/reply-rating-modal.component';
import { getUserById } from 'src/api/resources/users';
import { deleteReview } from 'src/api/resources/reviews';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  @Input() data: any
  user: any
  exists: boolean

  constructor(private replyRatingModalCtrl: ModalController) {
    this.exists = true
  }

  async ngOnInit() {
    const request = await getUserById(this.data.userId)
    this.user = request.data
  }

  setDate(date: string){
    const year = new Date(date).getFullYear().toString()
    const month = new Date(date).getMonth().toString()
    const day = new Date(date).getDay().toString()
    return `${month}/${day}/${year}`
  }

  async openReplyRatingModal() {
    const modal = await this.replyRatingModalCtrl.create({
      component: ReplyRatingModalComponent,
      componentProps: {
        Review: this.data
      }
    })
    modal.present();
  }

  async removeReview() {
    await deleteReview(this.data.id)
    this.exists = false
  }
}
