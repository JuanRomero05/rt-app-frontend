import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IonLoading, IonModal } from '@ionic/angular';
import { getAllGenres } from 'src/api/resources/genres';
import { getAllMovies } from 'src/api/resources/movies';
import { getAllShows } from 'src/api/resources/shows';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  @ViewChild('searchModal') modalSearch: IonModal;
  @ViewChild('loading') loading: IonLoading;
  
  segment: string = 'movies'
  searchForm: FormGroup;
  genreOptions: any[] = []
  movies: any[] = []
  series: any[] = []
  genre: number | undefined
  year: string | undefined
  order: string | undefined

  constructor(
    public fb: FormBuilder,
  ) {
    this.modalSearch = null as any,
      this.searchForm = this.fb.group({
        search: new FormControl(''),
      })
    this.loading = null as any
  }

  async ionViewWillEnter() {
    // set genre options
    this.loading.present()
    this.genreOptions.push(        {
      text: 'None',
      value: undefined
    })
    const request: any = await getAllGenres()
    request.data.map((genre:any) => {
      this.genreOptions.push({
        text: genre.title,
        value: genre.id
      })
    })
    this.loading.dismiss(null, 'cancel')
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
          text: 'None',
          value: undefined
        },
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
          value: 'topscore',
        },
        {
          text: 'Less Score',
          value: 'lowscore',
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
        this.genre = value.Genre.value;
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
        this.order = value.OrderBy.value;
      },
    },
  ];

  cancelModalSearch() {
    this.modalSearch.dismiss(null, 'cancel');
  }

  async sendSearchForm() {
    const query = this.searchForm.controls['search'].value
    const options: any = { search: query }
    if (this.order)
      options.order = this.order
    if (this.genre)
      options.genre = this.genre
    if (this.year)
      options.year = this.year

    this.loading.present()
    if (this.segment == 'movies') {
      const request = await getAllMovies(options)
      this.movies = request.data
    }
    if (this.segment == 'series') {
      const request = await getAllShows(options)
      this.series = request.data
    }
    this.loading.dismiss(null, 'cancel')
  }
}
