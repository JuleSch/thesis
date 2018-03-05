import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-select',
  template: `<div>
    <label>{{selectLabel}}:
      <select>
        <option *ngFor="let v of values" [value]="v">{{v.id}}</option> <!-- ngValue unterstützt im Vergleich zu value alle Datentypen, value nur strings-->
      </select>
    </label>
  </div>`,
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @Input() selectLabel = '';
  @Input() values: any;

  constructor() {
  }

  initSelectParams(data: any, ref: any) {
    //ref.instance.selectLabel = selectLabel;
    ref.instance.values = data;
  }

    //

  }

