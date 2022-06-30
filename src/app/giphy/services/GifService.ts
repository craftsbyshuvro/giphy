import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GifModel } from '../models/GifModel';
import { GifPaginationModel } from '../models/GifPaginationModel';

@Injectable({
  providedIn: 'root'
})

export class GifService {
  baseUrl = environment.APIBaseURL;
  apiKey = environment.GIPHY_API_KEY;
  headers = new HttpHeaders({
    'Content-Type': 'application/json', 'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  getGifByName(query: string, paginationConfig: GifPaginationModel) {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + 'gifs/search?api_key='
      + this.apiKey
      + '&limit=' + paginationConfig.PerPageRecord
      + '&offset=' + paginationConfig.Offset
      + '&rating=G&lang=en&q=' + query, options);
  }

  getTrendingGifs(paginationConfig: GifPaginationModel) {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + 'gifs/trending?api_key='
      + this.apiKey
      + '&limit=' + paginationConfig.PerPageRecord
      + '&offset=' + paginationConfig.Offset
      + '&rating=G&lang=en', options);
  }


  getTrendingSearchTerms() {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + 'trending/searches?api_key='
      + this.apiKey, options);
  }


  getSearchKeywords(query: string) {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + 'gifs/search/tags?api_key='
      + this.apiKey + '&q='
      + query + '&limit=5&offset=0', options);
  }
  
  getAllData() {
    const options = {
      headers: this.headers
    }
    return this.http.get("https://jsonplaceholder.typicode.com/todos", options);

  }

}
