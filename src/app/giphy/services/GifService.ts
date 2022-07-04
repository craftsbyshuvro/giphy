import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GifModel } from '../models/GifModel';
import { GifPaginationModel } from '../models/GifPaginationModel';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../../common/models/APIResponseModel';

@Injectable({
  providedIn: 'root'
})

export class GifService {
  BackEndBaseURL = environment.BackEndBaseURL;
  headers = new HttpHeaders({
    'Content-Type': 'application/json', 'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  getGifByName(query: string, paginationConfig: GifPaginationModel): Observable<APIResponseModel> {
    const options = {
      headers: this.headers
    }
    return this.http.get<APIResponseModel>(this.BackEndBaseURL + 'Giphy/GetGifByDesc'
      + '/' + query
      + '/' +paginationConfig.PerPageRecord
      + '/' + paginationConfig.Offset, options);
  }

  getTrendingGifs(paginationConfig: GifPaginationModel): Observable<APIResponseModel> {
    const options = {
      headers: this.headers
    }
    return this.http.get<APIResponseModel>(this.BackEndBaseURL + 'Giphy/GetTrendingGifs/'
      + paginationConfig.PerPageRecord + '/' + paginationConfig.Offset, options);
  }

  
  getTrendingSearchTerms(): Observable<APIResponseModel> {
    const options = {
      headers: this.headers
    }
    return this.http.get<APIResponseModel>(this.BackEndBaseURL + 'Giphy/GetTrendingSearchTerms', options);
  }


  getSearchKeywords(query: string): Observable<APIResponseModel> {
    const options = {
      headers: this.headers
    }
    return this.http.get<APIResponseModel>(this.BackEndBaseURL + 'Giphy/GetSuggestedKeywords'
      + '/' + query + '/7/0', options);
  }

}
