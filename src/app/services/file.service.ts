import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
//


@Injectable()
export class FileService {

  constructor(private http: HttpClient) {
  }

  getFile(filepath: string) {
    return this.http.get(filepath);
  }




}
