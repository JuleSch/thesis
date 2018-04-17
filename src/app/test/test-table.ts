import {Component, ViewContainerRef} from '@angular/core';
import {DynamicTableComponent} from '../dynamic-elements/dynamic-table/dynamic-table.component';
import {FileService} from '../services/file.service';



@Component({
  providers: [
    DynamicTableComponent,
  ],
  selector: 'app-test-table',
  template: `<div class="container text-center mt-5">
    <button *ngIf="bool" class="btn btn-outline-info" (click)="buttonClick()"><i class="fas fa-power-off fa-4x"></i></button>
  </div>`
})

export class TestTableComponent {
  /**
   * Die Datei-Variabeln können später auch übergeben werden und müsse nicht statisch bleiben.
   */
  file1 = '/assets/table.json';
  file2 = '/assets/tableData.json';
  file3 = '/assets/IPTable.json';
  bool = true;
  jsonData: any;

  // TODO: Herausfinden, warum das ViewContainerRaf hier bleiben muss.
  constructor(private dynamicTable: DynamicTableComponent,
              private viewContainerRef: ViewContainerRef,
              private fileService: FileService) {}

  /**
   * Diese Methode liest drei Json-Dateien aus und speichert sie anschließend in ein JS-Objekt. Dieses wird dann als Parameter der Methode processTable übergeben.
   * @param {string} tableConfig    Der Pfad zur Json-Datei, die die Konfiguration der Tabelle enthält.
   * @param {string} tableData      Der Pfad zur Json-Datei, die die Daten der Tabelle enthält.
   * @param {string} table2Config   Der Pfad zur Json-Datei, die die Konfiguration der 2. Tabelle enthält.
   */
  processTableDataFiles(tableConfig: string, tableData: string, table2Config: string) {
    const promiseOne = new Promise((resolve, reject) => {
      this.fileService.getFile(tableConfig).subscribe(
        data => resolve(data),
        error => reject('Beim Auslesen der tableConfig-Datei trat ein Fehler auf: ' + error)
      );
    });
    const promiseTwo = new Promise((resolve, reject) => {
      this.fileService.getFile(tableData).subscribe(
        data => resolve(data),
        error => reject('Beim Auslesen der tableData-Datei trat ein Fehler auf: ' + error)
      );
    });
    const promiseThree = new Promise((resolve, reject) => {
      this.fileService.getFile(table2Config).subscribe(
        data => resolve(data),
        error => reject('Beim Auslesen der table2Config-Datei trat ein Fehler auf: ' + error)
      );
    });
    // Der Callback für alle Promisses.
    Promise.all([promiseOne, promiseTwo, promiseThree])
      .then((values) => {
        this.processTable(values);
      })
      .catch((reason) => {
      console.error(reason);
    });
  }

  /**
   * Diese Methode erzeugt dynamische Tabellen.
   * @param {Array<object>} tableValues   Die Daten für die Tabellen.
   */
  processTable(tableValues: Array<object>) {
    const cameraTable = [tableValues[0]['attributes'], tableValues[1], tableValues[1]['data']];
    const profilesTable = [tableValues[2]['attributes'], tableValues[1], tableValues[1]['profiles']];
    this.dynamicTable.createTable(cameraTable, true);
    this.dynamicTable.createTable(profilesTable, false);
  }

  /**
   * Diese Methode ruft processTableDataFiles auf, wenn die Variabel "this.bool" true ist.
   */
  buttonClick() {
    if (this.bool) {
      this.processTableDataFiles(this.file1, this.file2, this.file3);
      this.bool = false;
    }
  }

}


