import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CardModalComponent } from '../card-modal/card-modal.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {

  @Input() data: any

  constructor(private cardModalCtrl: ModalController) { }

  ngOnInit() { }

  async openCard() {
    const modal = await this.cardModalCtrl.create({
      component: CardModalComponent
    });
    modal.present();
  }

  setYear(date: string){
    return new Date(date).getFullYear().toString()
  }

  setGenres(genres: any[]){
    if (genres.length == 1)
      return genres[0].title

    if (genres.length == 2)
      return `${genres[0].title}, ${genres[1].title}`

    if (genres.length > 2)
      return `${genres[0].title}, ${genres[1].title}, ...`
  }

}
