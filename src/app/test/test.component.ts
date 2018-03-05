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
  template: ``
})

export class TestComponent implements OnInit {
  file = '/assets/profiles.json';

  constructor(private dynamicButton: DynamicButtonComponent,
              private dynamicCheckbox: DynamicCheckboxComponent,
              private dynamicTextfield: DynamicTextfieldComponent,
              private dynamicSelect: DynamicSelectComponent,
              private viewContainerRef: ViewContainerRef,
              private fileService: FileService) {}

  ngOnInit() {
    // this.dynamicButton.createButton(this.viewContainerRef, 'OnInit-Button');
   // this.dynamicCheckbox.createCheckbox('OnInit-Checkbox', false );
    // this.dynamicTextfield.createTextfield('OnInit-Textfield', true, this.viewContainerRef);
    //this.fileService.getFile(this.file).subscribe(data => this.dynamicSelect.createSelect('Hier die Box', data.profiles, this.viewContainerRef));
  }


  /* Optional, falls ich es mal brauche.
  processOneDataFile(File: string) {
    let promise = new Promise((resolve, reject) => {
      this.fileService.getFile(File).subscribe(data => resolve(data));
    });

    Promise.all([promise]).then((values) => {
      console.log(values);
      this.dynamicSelect.createSelect('Hier die Box', values[0], this.viewContainerRef);
    });
  }*/
}


