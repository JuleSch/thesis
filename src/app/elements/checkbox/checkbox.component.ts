import {Component, Input } from '@angular/core';


@Component({
  selector: 'app-checkbox',
  template: `<label>{{checkboxLabel}}<input [(ngModel)]="formData[valueName]" type="checkbox"></label>
  <div></div>`,
  styleUrls: ['./checkbox.component.css']
})

export class CheckboxComponent {
  @Input() checkboxLabel = '';
  @Input() formData: any;
  @Input() valueName: string;

  initCheckboxParams(checkboxLabel: string, formData: any, valueName: string, viewContainerRef: any) {
    viewContainerRef.instance.checkboxLabel = checkboxLabel;
    viewContainerRef.instance.formData = formData;
    viewContainerRef.instance.valueName = valueName;
  }
}
