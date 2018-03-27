import {Component, Input} from '@angular/core';

// TODO: herausfinden warum Syntax mit "!" und nicht mit {{}}
@Component({
  selector: 'app-textfield',
  template: `<label>{{label}}<input type="{{type}}" value="{{value}}" [readonly]="!readonly"></label>`,
  styleUrls: ['./textfield.component.css']
})

export class TextfieldComponent {
  @Input() label: string;
  @Input() readonly: boolean;
  @Input() value: string;
  @Input() type: string;

  constructor() {}

  initTextfieldParams(label: string, readonly: boolean, value: string, type: string, ref: any) {
    ref.instance.label = label;
    ref.instance.readonly = readonly;
    ref.instance.value = value;
    ref.instance.type = type;
  }

}


