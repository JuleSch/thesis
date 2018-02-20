import {Component, Input} from '@angular/core';

// TODO: herausfinden warum Syntax mit "!" und nicht mit {{}}
@Component({
  selector: 'app-textfield',
  template: `<label>{{label}}<input [readonly]="!readonly"></label>`,
  styleUrls: ['./textfield.component.css']
})

export class TextfieldComponent {
  @Input() label = 'Label';
  @Input() readonly: boolean;

  constructor() {}

  initTextfieldParams(label: string, readonly: boolean, ref: any){
    ref.instance.label = label;
    ref.instance.readonly = readonly;
  }

}


