import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {DynamicButtonComponent} from '../dynamic-elements/dynamic-button/dynamic-button.component';
import {DynamicCheckboxComponent} from '../dynamic-elements/dynamic-checkbox/dynamic-checkbox.component';
import {FileService} from '../services/file.service';
import {DynamicTextfieldComponent} from '../dynamic-elements/dynamic-textfield/dynamic-textfield.component';
import {DynamicSelectComponent} from '../dynamic-elements/dynamic-select/dynamic-select.component';



@Component({
  providers: [
    DynamicButtonComponent,
    DynamicCheckboxComponent,
    DynamicTextfieldComponent,
    DynamicSelectComponent
  ],
  selector: 'app-test',
  template: `<div></div>`
})

export class TestComponent implements OnInit {
  configFile = '/assets/form.json';
  dataFile = '/assets/formData.json';

  constructor(private dynamicCheckbox: DynamicCheckboxComponent,
              private dynamicTextfield: DynamicTextfieldComponent,
              private dynamicSelect: DynamicSelectComponent,
              private viewContainerRef: ViewContainerRef,
              private fileService: FileService
              // private dynamicButton: DynamicButtonComponent,
  ) {}

  ngOnInit() {
    this.processDataFile(this.configFile, this.dataFile);
    // this.dynamicButton.createButton(this.viewContainerRef, 'OnInit-Button');
    // this.dynamicCheckbox.createCheckbox('OnInit-Checkbox', false );
    // this.dynamicTextfield.createTextfield('OnInit-Textfield', true, this.viewContainerRef);
    //this.fileService.getFile(this.file).subscribe(data => this.dynamicSelect.createSelect('Hier die Box', data.profiles, this.viewContainerRef));
  }

  processDataFile(configFile: string, dataFile: string) {
    let promise1 = new Promise((resolve, reject) => {
      this.fileService.getFile(configFile).subscribe(data => resolve(data));
    });

    let promise2 = new Promise((resolve, reject) => {
      this.fileService.getFile(dataFile).subscribe(data => resolve(data));
    });

    Promise.all([promise1, promise2]).then((values) => {
      // values1 = das promise2, formData= ist die Id, des Arrays, [0] ist das erste Element
      const formData = values[1]['formData'][0];

      for (let entry of values[0]['attributes']) {
        if (entry.hasOwnProperty('type')) {
          switch (entry.type) {
            case 'boolean':
              console.log(formData['active']);
              this.dynamicCheckbox.createCheckbox(entry.label, formData['active'] );
              break;
            case 'text':
              this.dynamicTextfield.createTextfield(entry.label, entry.readOnly, formData[entry.id], 'text');
              break;
            default: console.error('Die ID' ,  entry.id , 'stimmt nicht überein.');
          }
        }
        else {
          console.error('HasOwnProperty Fehler!');
        }
      }
      // this.dynamicSelect.createSelect('Hier die Box', values[0], this.viewContainerRef);
    });
  }
}


