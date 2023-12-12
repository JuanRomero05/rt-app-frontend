import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  segment: string = 'movies'

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

  constructor() { }

}
