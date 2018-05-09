import {Component, Input } from '@angular/core';


@Component({
  selector: 'app-checkbox',
  template: `<label>{{checkboxLabel}}<input [(ngModel)]="formData['active']" type="checkbox"></label>
  <div></div>`,
  styleUrls: ['./checkbox.component.css']
})

export class CheckboxComponent {
  @Input() checkboxLabel = '';
  @Input() formData: any;

  initCheckboxParams(checkboxLabel: string, formData: any, ref: any) {
    ref.instance.checkboxLabel = checkboxLabel;
    ref.instance.formData = formData;
  }
}
