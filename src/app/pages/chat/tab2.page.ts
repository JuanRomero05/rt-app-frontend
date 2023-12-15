import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  chatForm: FormGroup;

  constructor(
    public fb: FormBuilder,
  ) {
    this.chatForm = this.fb.group({
      'message': new FormControl('')
    })
  }

  sendMessage() {
    console.log('a');

  }

}
