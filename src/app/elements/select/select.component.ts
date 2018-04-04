import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-select',
  template: `<div>
    <label>{{selectLabel}}:
      <select>
        <option *ngFor="let v of values" [ngValue]="v" [selected]="v.id == defaultValue">{{v.label}}</option> <!-- ngValue unterstützt im Vergleich zu value alle Datentypen, value nur strings-->
      </select>
    </label>
  </div>`,
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @Input() selectLabel = '';
  @Input() values: any;
  @Input() defaultValue: string;

  constructor() {
  }

  initSelectParams(data: any, label: string, defaultValue: string, ref: any) {
    //ref.instance.selectLabel = selectLabel;
    ref.instance.values = data;
    ref.instance.selectLabel = label;
    ref.instance.defaultValue = defaultValue;

  }

    //

  }

