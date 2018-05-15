import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-textfield',
  template: `<label>{{label}}<input type="{{type}}" [(ngModel)]="formData[valueName]" [readonly]="readonly" (ngModelChange)="textChanged($event)"></label>
             <div></div>`,
})

export class TextfieldComponent {
  @Input() label: string;
  @Input() readonly: boolean;
  @Input() formData: any;
  @Input() type: string;
  @Input() valueName: string;



  constructor() {}

  initTextfieldParams(label: string, readonly: boolean, formData: any, valueName: string, type: string, viewContainerRef: any) {
    viewContainerRef.instance.label = label;
    viewContainerRef.instance.readonly = readonly;
    viewContainerRef.instance.formData = formData;
    viewContainerRef.instance.type = type;
    viewContainerRef.instance.valueName = valueName;
  }

  private textChanged(event) {
    console.log('changed', this.valueName, event);
    this.valueName = event;                          // <<<###added
  }

}


