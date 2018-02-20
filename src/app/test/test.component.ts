import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {DynamicButtonComponent} from '../dynamic-elements/dynamic-button/dynamic-button.component';
import {DynamicCheckboxComponent} from '../dynamic-elements/dynamic-checkbox/dynamic-checkbox.component';
import {DynamicTableComponent} from '../dynamic-elements/dynamic-table/dynamic-table.component';
import {FileService} from '../services/file.service';
import {DynamicTextfieldComponent} from '../dynamic-elements/dynamic-textfield/dynamic-textfield.component';
import {DynamicSelectComponent} from '../dynamic-elements/dynamic-select/dynamic-select.component';



@Component({
  providers: [
    DynamicButtonComponent,
    DynamicCheckboxComponent,
    DynamicTableComponent,
    DynamicTextfieldComponent,
    DynamicSelectComponent
  ],
  selector: 'app-test',
  template: `<div>
    <button (click)="buttonClick()">Ich erzeuge eine Tabelle</button>
  </div>`
})
export class TestComponent implements OnInit {

  constructor(private dynamicButton: DynamicButtonComponent,
              private dynamicCheckbox: DynamicCheckboxComponent,
              private dynamicTable: DynamicTableComponent,
              private dynamicTextfield: DynamicTextfieldComponent,
              private dynamicSelect: DynamicSelectComponent,
              private viewContainerRef: ViewContainerRef,
              private fileService: FileService) {}

  ngOnInit() {
    this.dynamicButton.createButton(this.viewContainerRef, 'OnInit-Button');
    this.dynamicCheckbox.createCheckbox('OnInit-Checkbox', false, this.viewContainerRef, );
    this.dynamicTextfield.createTextfield('OnInit-Textfield', true, this.viewContainerRef);

    this.processOneDataFile(this.file3);
  }

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


  processOneDataFile(File: string) {
    let promise = new Promise((resolve, reject) => {
      this.fileService.getFile(File).subscribe(data => resolve(data));
    });

    Promise.all([promise]).then((values) => {
      console.log(values);
      this.dynamicSelect.createSelect('Hier die Box', values[0], this.viewContainerRef);
    });
  }
}


