import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-textfield',
  template: `<label>{{label}}<input type="{{type}}" [(ngModel)]="formData[valueName]" [readonly]="readonly" (ngModelChange)="textChanged($event)" placeholder="Enter text here."></label>
             <div></div>`,
})

export class TextfieldComponent {
  @Input() type: string;
  @Input() label: string;
  @Input() readonly: boolean;
  @Input() formData: any;
  @Input() valueName: string;



  constructor() {}

  initTextfieldParams(label: string, type: string, readonly = false, formData = [], valueName = 'valueName',  viewContainerRef?: any) {
    viewContainerRef.instance.type = type;
    viewContainerRef.instance.label = label;
    viewContainerRef.instance.readonly = readonly;
    viewContainerRef.instance.formData = formData;
    viewContainerRef.instance.valueName = valueName;
  }

  private textChanged(event) {
    console.log('changed', this.valueName, event);
    this.valueName = event;                          // <<<###added
  }

}


