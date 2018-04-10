import {Component, Input } from '@angular/core';


@Component({
  selector: 'app-checkbox',
  template: `<label *ngIf="active; else check">{{checkboxLabel}}<input type="checkbox" checked></label>
  <ng-template #check>{{checkboxLabel}}<input type="checkbox"></ng-template>
  <div></div>`,
  styleUrls: ['./checkbox.component.css']
})

export class CheckboxComponent {
  @Input() checkboxLabel = '';
  @Input() active: boolean;

  initCheckboxParams(checkboxLabel: string, active: boolean, ref: any) {
    ref.instance.checkboxLabel = checkboxLabel;
    ref.instance.active = active;
  }
}
