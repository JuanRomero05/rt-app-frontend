import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CardModalComponent } from '../card-modal/card-modal.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {

  constructor(private cardModalCtrl: ModalController) { }

  ngOnInit() { }

  async openCard() {
    const modal = await this.cardModalCtrl.create({
      component: CardModalComponent
    });
    modal.present();
  }

}
