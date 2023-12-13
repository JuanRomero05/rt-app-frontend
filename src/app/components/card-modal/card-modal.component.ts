import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent implements OnInit {

  isClicked = false;

  reviewForm: FormGroup;

  constructor(
    private cardModalCtrl: ModalController,
    public fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      'input-review': new FormControl,
    })
  }

  ngOnInit() { }

  toggleClicked() {
    this.isClicked = !this.isClicked;
  }

  cancel() {
    return this.cardModalCtrl.dismiss(null, 'cancel');
  }

  /* confirm() {
    return this.cardModalCtrl.dismiss()
  } */

  postReview() {
    console.log('a');

  }

}
