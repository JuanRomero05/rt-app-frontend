import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { getAllGenres } from 'src/api/resources/genres';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @ViewChild('searchModal') modalSearch: IonModal;

  async ngOnInit() {
    const request: any = await getAllGenres()
    request.data.map((genre:any) => {
      this.genreOptions.push({
        text: genre.title,
        value: genre.id
      })
    })
  }

  segment: string = 'movies'
  searchForm: FormGroup;
  genreOptions: any[] = []
  data: any[] = []

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
      options: this.genreOptions
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
    const query = this.searchForm.controls['search'].value
    if (this.segment == 'movies') {
      
    }
    if (this.segment == 'series') {
      
    }
  }
}
