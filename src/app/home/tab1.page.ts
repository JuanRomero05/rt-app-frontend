import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  segment: string = 'movies'

  public pickerColumns = [
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

  public pickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value: any) => {
        console.log(`You selected a ${value.OrderBy.text}`);
      },
    },
  ];

  constructor() { }

}
