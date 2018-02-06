import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
//



@Injectable()
export class JsonService {
  jsonFile = '/assets/test.json';

  constructor(private http: HttpClient) {
  }

  getJson() {
    return this.http.get(this.jsonFile);
  }




}


