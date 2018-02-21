import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {DynamicTableComponent} from '../dynamic-elements/dynamic-table/dynamic-table.component';
import {FileService} from '../services/file.service';



@Component({
  providers: [
    DynamicTableComponent
  ],
  selector: 'app-test-table',
  template: `<div>
    <button (click)="buttonClick()">Ich erzeuge eine Tabelle</button>
  </div>`
})
export class TestTableComponent {

  constructor(private dynamicTable: DynamicTableComponent,
              private viewContainerRef: ViewContainerRef,
              private fileService: FileService) {}

  file1 = '/assets/table.json';
  file2 = '/assets/tableData.json';
  file3 = '/assets/test.json';
  bool = true;



  buttonClick($event) {

    if (this.bool) {
      this.processThreeDataFiles(this.file1, this.file2, this.file3);
      this.bool = false;
    }
  }

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

    // Callback der 3 Files
    Promise.all([promiseOne, promiseTwo, promiseThree]). then((values) => {
        console.log(values);
        this.dynamicTable.createTable(values, this.viewContainerRef);
        // Hier rufe ich die Tablemethode auf und übergebe das Array und mein ViewContainerRef-Objekt der Tabelle als Parameter.
        // this.tableComponent.addTable(values, this.tableContainer);
      }
    );
  }


}


