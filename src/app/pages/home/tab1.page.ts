import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('searchModal') modalSearch: IonModal;

  segment: string = 'movies'

  searchForm: FormGroup;

  constructor(
    public fb: FormBuilder,
  ) {
    this.modalSearch = null as any,
      this.searchForm = this.fb.group({
        search: new FormControl(''),
      })
  }

  public pickerColumnsGenre = [
    {
      name: 'Genre',
      options: [
        {
          text: 'Horror',
          value: 'horror',
        },
        {
          text: 'Action',
          value: 'action',
        },
        {
          text: 'Science Fiction',
          value: 'science-fiction',
        },
        {
          text: 'Drama',
          value: 'drama',
        },
        {
          text: 'Animation',
          value: 'animation',
        },
        {
          text: 'Documentary',
          value: 'documentary',
        },
      ],
    },
  ];

  public pickerColumnsOrderBy = [
    {
      name: 'OrderBy',
      options: [
        {
          text: 'New',
          value: 'new',
        },
        {
          text: 'Old',
          value: 'old',
        },
        {
          text: 'Top Score',
          value: 'top-score',
        },
        {
          text: 'Less Score',
          value: 'less-score',
        },
      ],
    },
  ];

  public pickerButtonsGenre = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value: any) => {
        console.log(`You selected a ${value.Genre.text} Genre`);
      },
    },
  ];

  public pickerButtonsOrderBy = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value: any) => {
        console.log(`You selected a ${value.OrderBy.text} Order by`);
      },
    },
  ];

  cancelModalSearch() {
    this.modalSearch.dismiss(null, 'cancel');
  }

  sendSearchForm() {
    console.log('a');

  }

}
