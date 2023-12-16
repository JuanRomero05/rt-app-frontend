import { Component, Input, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { getMovieById, getReviewsByMovie } from 'src/api/resources/movies';
import { rate } from 'src/api/resources/ratings';
import { createReview } from 'src/api/resources/reviews';
import { getReviewsByShow, getShowById } from 'src/api/resources/shows';
import { getAuthUser, getUserById } from 'src/api/resources/users';
import { getUserId } from 'src/storage/auth';
import { createAlert } from 'src/utils/alert';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent implements OnInit {

  @Input() Id: any
  @Input() IsTv: any
  @ViewChild('modalTrailer') modalTrailer: IonModal;

  trailer: any
  isClicked = false;
  data: any
  reviewForm: FormGroup;
  user: any
  reviews: any[] = []
  stars: boolean[] = [false, false, false, false, false]
  creating: boolean = false

  constructor(
    public alertController: AlertController,
    private modalController: ModalController,
    public fb: FormBuilder,
    private domSanitizer: DomSanitizer
  ) {
    this.reviewForm = this.fb.group({
      'input-review': new FormControl,
    })
    this.modalTrailer = null as any

  }

  async ngOnInit() {
    // movie/show info
    let request
    if (this.IsTv) {
      request = await getShowById(this.Id)
    } else {
      request = await getMovieById(this.Id)
    }
    this.data = request.data
    const url = `https://www.youtube.com/embed/${this.data.trailerUrl}`
    this.trailer = this.domSanitizer.bypassSecurityTrustResourceUrl(url)

    // current user info
    const id = await getUserId()
    request = await getUserById(parseInt(<string>id))
    this.user = request.data

    // current user rate
    const userStars = this.data.userRate
    this.setRate(userStars)
    console.log(this.stars)

    // reviews
    if (this.IsTv) {
      request = await getReviewsByShow(this.Id)
    } else {
      request = await getReviewsByMovie(this.Id)
    }
    this.reviews = request.data
  }

  /*  trailerUrl = 'https://www.youtube.com/embed/';
 
   getIframeUrl() {
     console.log(this.trailerUrl + this.data.trailerUrl);
 
     return this.trailerUrl + this.data.trailerUrl;
   } */

  /* async openTrailerModal() {
    const modal = await this.modalController.create({
      component: TrailerModalComponent, // Reemplaza "TrailerModalComponent" con el nombre de tu componente modal
      componentProps: {
        videoUrl: '../../../assets/video_prueba.mp4' // Reemplaza "URL_DEL_VIDEO" con la URL del video que deseas reproducir
      }
    });
    return await modal.present();
  } */

  cancelModalTrailer() {
    this.modalTrailer.dismiss(null, 'cancel');
  }

  async submitRate() {
    this.creating = true
    let score = 0
    for (let i = 0; i < this.stars.length; i++) {
      if (!this.stars[i])
        break
      score++
    }
    await rate({
      userId: this.user.id,
      mediaId: this.data.id,
      score: String(score)
    })
    this.creating = false
    const alert = await createAlert(
      this.alertController,
      'Rate succeed',
      'You have done rate correctly'
    )
    await alert.present()
  }

  setRate(star: number) {
    for (let i = 0; i < this.stars.length; i++) {
      if (i >= star) {
        this.stars[i] = false
        continue
      }
      this.stars[i] = true
    }
  }

  setYear(date: string) {
    return new Date(date).getFullYear().toString()
  }

  setGenres(genres: any[]) {
    let result = ''
    for (let i = 0; i < genres.length; i++) {
      result += genres[i].title
      if (i != genres.length - 1)
        result += ','
      result += ' '
    }
    return result
  }

  setDate(date: string) {
    const year = new Date(date).getFullYear().toString()
    const month = new Date(date).getMonth().toString()
    const day = new Date(date).getDay().toString()
    return `${month}/${day}/${year}`
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel')
  }

  /* confirm() {
    return this.cardModalCtrl.dismiss()
  } */

  async postReview() {
    this.creating = true
    const review = await createReview({
      userId: this.user.id,
      mediaId: this.Id,
      content: this.reviewForm.controls['input-review'].value
    })
    this.reviewForm.controls['input-review'].setValue('')
    this.reviews.push(review.data)
    this.creating = false
  }
}
