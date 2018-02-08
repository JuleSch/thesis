import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
//



@Injectable()
export class JsonService {

  constructor(private http: HttpClient) {
  }

  getJson(filepath: string) {
    return this.http.get(filepath);
  }




}


