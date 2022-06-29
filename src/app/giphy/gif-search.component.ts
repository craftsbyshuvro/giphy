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

  public _gifData = new Array<GifModel>();
  public _paginateionConfig = new GifPaginationModel();
  public gifSearchForm: any;
  public inputText: string = '';
  public isFormSubmitted: boolean = false;

  public searchSuggestions: string[] = []


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private gifService: GifService,
    private http: HttpClient,
    private fb: FormBuilder  ) {
  }

  ngOnInit() {
    this.initializeFormGroup();
    this.getGiphy('');
  }

  initializeFormGroup() {
    this.gifSearchForm = this.fb.group({
      inputText: ['', [Validators.required, Validators.minLength(3)]]
    });

  }

  onSearch() {
    
    this.isFormSubmitted = true;
    
    if (this.gifSearchForm.invalid) {
      return;
    }

    if (this.gifSearchForm.value['inputText']?.name == undefined) {
      this.inputText = this.gifSearchForm.value['inputText'];
    } else {
      this.inputText = this.gifSearchForm.value['inputText']?.name;
    }

    this.resetPagination();
    this.getGiphy(this.inputText);
  }

  selectEvent(item: string) {
    this.gifSearchForm.get('inputText').setValue(item);
  }

  onChangeSearch(val: string) {

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
    this._paginateionConfig.PerPageRecord = 12;
    this._paginateionConfig.CurrentPage = 1;
  }

  getPage(page: number) {
    this._paginateionConfig.Offset = page - 1;
    this.getGiphy(this.inputText);
  }

  getGiphy(query: string) {

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

}
