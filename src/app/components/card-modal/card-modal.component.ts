import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent implements OnInit {

  constructor(private cardModalCtrl: ModalController) { }

  ngOnInit() { }

  cancel() {
    return this.cardModalCtrl.dismiss(null, 'cancel');
  }

  /* confirm() {
    return this.cardModalCtrl.dismiss()
  } */

}
