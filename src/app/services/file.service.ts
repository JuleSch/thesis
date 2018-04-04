import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
//


@Injectable()
export class FileService {
  constructor(private http: HttpClient) {
  }

  /**
   * Diese Methode liest eine Datei ein und gibt den Inhalt als JS-Objekt zurück.
   * @param {string} filepath       Der Dateipfad als string.
   * @returns {Observable<Object>}  Der Rückgabewert.
   */
  getFile(filepath: string) {
    return this.http.get(filepath);
  }
}
