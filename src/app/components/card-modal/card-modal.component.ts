import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { getMovieById, getReviewsByMovie } from 'src/api/resources/movies';
import { createReview } from 'src/api/resources/reviews';
import { getReviewsByShow, getShowById } from 'src/api/resources/shows';
import { getAuthUser } from 'src/api/resources/users';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent implements OnInit{

  @Input() Id: any
  @Input() IsTv: any
  
  isClicked = false;
  data: any
  reviewForm: FormGroup;
  user: any
  reviews: any[] = []

  constructor(
    private cardModalCtrl: ModalController,
    public fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      'input-review': new FormControl,
    })
  }

  async ngOnInit() {
    let request
    if (this.IsTv){
      request = await getShowById(this.Id)
    } else {
      request = await getMovieById(this.Id)
    }
    this.data = request.data

    if (!this.data.posterUrl)
      this.data.posterUrl = './../../assets/cover3.png'

    this.user = { 
      firstName: 'Angel',
      lastName: 'Di Maria', 
      id: 1, 
      isCritic: false 
    }
    if (this.IsTv){
      request = await getReviewsByShow(this.Id)
    } else {
      request = await getReviewsByMovie(this.Id)
    }
    this.reviews = request.data
  }

  toggleClicked() {
    this.isClicked = !this.isClicked;
  }

  cancel() {
    return this.cardModalCtrl.dismiss(null, 'cancel');
  }

  setYear(date: string){
    return new Date(date).getFullYear().toString()
  }

  setGenres(genres: any[]){
    let result = ''
    for (let i=0; i<genres.length; i++) {
      result += genres[i].title
      if (i != genres.length - 1)
        result += ','
      result += ' '
    }
    return result
  }

  setDate(date: string){
    const year = new Date(date).getFullYear().toString()
    const month = new Date(date).getMonth().toString()
    const day = new Date(date).getDay().toString()
    return `${month}/${day}/${year}`
  }

  /* confirm() {
    return this.cardModalCtrl.dismiss()
  } */

  async postReview() {
    const review = await createReview({
      userId: this.user.id,
      mediaId: this.Id,
      content: this.reviewForm.controls['input-review'].value
    })
    this.reviewForm.controls['input-review'].setValue('')
    this.reviews.push(review.data)
  }
}
