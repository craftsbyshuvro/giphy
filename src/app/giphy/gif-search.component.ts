import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GifModel } from './models/GifModel';
import { GifPaginationModel } from './models/GifPaginationModel';
import { GifService } from './services/GifService';

@Component({
  selector: 'gif-search',
  styleUrls: ['gif-search.component.css'],
  templateUrl: 'gif-search.component.html',
})
export class GifSearchComponent implements OnInit {

  // Variables Declared to use across the component
  public _gifData = new Array<GifModel>();
  public _paginateionConfig = new GifPaginationModel();
  public gifSearchForm: any;
  public inputText: string = '';
  public isFormSubmitted: boolean = false;

  public searchSuggestions: string[] = []
  public trendingSearchTerms: string[] = []

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private gifService: GifService,
    private http: HttpClient,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    // Setting pagination initial values
    this.resetPagination()
    // Fetching Trending Gifs when being loaded for the first time
    this.getTrendingGif();

    // Fetching Trending search terms
    this.getTrendingSearchTerms()

    //Resetting form values
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    // Setting form values and validation rules
    this.gifSearchForm = this.fb.group({
      inputText: ['', [Validators.required, Validators.minLength(3)]]
    });

  }

  onSearch() {

    // This variable is used to check if the form is submitted or not
    this.isFormSubmitted = true;


    // Checking whether the form is valid or not
    // If not valid, return from here
    if (this.gifSearchForm.invalid) {
      return;
    }

    // When object property doesn't have value we are getting the value directly from the form
    if (this.gifSearchForm.value['inputText']?.name == undefined) {
      this.inputText = this.gifSearchForm.value['inputText'];
    } else {
      this.inputText = this.gifSearchForm.value['inputText']?.name;
    }

    this.resetPagination();
    this.getGiphy(this.inputText);
  }

  selectEvent(item: string) {
    // This function is called when selected item is changed
    this.gifSearchForm.get('inputText').setValue(item);
    this.onSearch();
  }

  onChangeSearch(val: string) {
    // This function triggers when input changes    
    this.gifService.getSearchKeywords(val).subscribe(
      response => {
        let resData = JSON.parse(JSON.stringify(response));
        let keys = resData.data;

        this.searchSuggestions = keys.map((item: any) => ({
          name: item.name
        }));

      },
      error => {
        alert(error.message);
      },
      () => {
        // No errors, route to new page
      }
    );

  }

  resetPagination() {
    // Setting pagination initial values
    this._paginateionConfig.PerPageRecord = 12;
    this._paginateionConfig.CurrentPage = 1;
  }

  getPage(page: number) {
    // This function giges us the current page no when user clicks on the pagination

    this._paginateionConfig.Offset = page - 1;

    if (this.inputText == '' || this.inputText == undefined) {
      this.getTrendingGif();
    } else {
      this.getGiphy(this.inputText);
    }

  }

  getGiphy(query: string) {
    // Calling service to fetch data by desc
    this.gifService.getGifByName(query, this._paginateionConfig).subscribe(
      response => {
        let resData = JSON.parse(JSON.stringify(response));
        let gifs = resData.data;

        this._gifData = gifs.map((item: any) => ({
          title: item.title,
          img_url: item.images.preview_webp.url
        }));

        this._paginateionConfig.TotalRecords = resData.pagination.total_count;

      },
      error => {
        alert(error.message);
      },
      () => {
        // No errors, route to new page
      }
    );
  };

  getTrendingGif() {
    // Calling service to fetch trending data
    this.gifService.getTrendingGifs(this._paginateionConfig).subscribe(
      response => {
        let resData = JSON.parse(JSON.stringify(response));
        let gifs = resData.data;

        this._gifData = gifs.map((item: any) => ({
          title: item.title,
          img_url: item.images.preview_webp.url
        }));

        this._paginateionConfig.TotalRecords = resData.pagination.total_count;

      },
      error => {
        alert(error.message);
      },
      () => {
        // No errors, route to new page
      }
    );
  };

  getTrendingSearchTerms() {

    // Calling service to fetch trending data
    this.gifService.getTrendingSearchTerms().subscribe(
      response => {
        let resData = JSON.parse(JSON.stringify(response));
        this.trendingSearchTerms = resData.data;
      },
      error => {
        alert(error.message);
      },
      () => {
        // No errors, route to new page
      }
    );
  };

  searchByTerm(tag: string) {
    // This function is called when user clicks on popular tags
    this.gifSearchForm.get('inputText').setValue(tag);
    this.onSearch();
  }

}
