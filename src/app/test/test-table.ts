import {Component, ViewContainerRef} from '@angular/core';
import {DynamicTableComponent} from '../dynamic-elements/dynamic-table/dynamic-table.component';
import {FileService} from '../services/file.service';
import {DynamicSelectComponent} from '../dynamic-elements/dynamic-select/dynamic-select.component';



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
  file1 = '/assets/table.json';
  file2 = '/assets/tableData.json';
  file3 = '/assets/IPTable.json';
  bool = true;

  constructor(private dynamicTable: DynamicTableComponent,
              private viewContainerRef: ViewContainerRef,
              private fileService: FileService) {}


// Ich lese 3 Files aus, die ich anschließend als ein Array mit drei JS-Objekten im Callback zurückbekomme.
// Dieses übergebe ich dann als Parameter in einem Methodenaufruf.

  processThreeDataFiles(File1: string, File2: string, File3: string) {
    let promiseOne = new Promise((resolve, reject) => {
      this.fileService.getFile(File1).subscribe(data => resolve(data));
    });
    let promiseTwo = new Promise((resolve, reject) => {
      this.fileService.getFile(File2).subscribe(data => resolve(data));
    });
    let promiseThree = new Promise((resolve, reject) => {
      this.fileService.getFile(File3).subscribe(data => resolve(data));
    });

    // Callback der 2 Files
    Promise.all([promiseOne, promiseTwo, promiseThree]). then((values) => {
        // console.log(values);
        let cameraTable = [values[0]['attributes'], values[1], values[1]['data']];
        let profilesTable = [values[2]['attributes'], values[1], values[1]['profiles']];
        this.dynamicTable.createTable(cameraTable);
        this.dynamicTable.createTable(profilesTable);
        // Hier rufe ich die Tablemethode auf und übergebe das Array und mein ViewContainerRef-Objekt der Tabelle als Parameter.
        // this.tableComponent.addTable(values, this.tableContainer);
      }
    );
  }

  buttonClick($event) {
    if (this.bool) {
      this.processThreeDataFiles(this.file1, this.file2, this.file3);
      this.bool = false;
    }
  }



}


