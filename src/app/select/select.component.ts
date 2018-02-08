import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ViewContainerRef, ComponentFactory, ComponentFactoryResolver} from '@angular/core';
import {JsonService} from '../services/json.service';

@Component({
  selector: 'dynamic-selectbox',
  template: `<div>
    <label>{{selectLabel}}:
      <select>
        <option *ngFor="let v of values" [value]="v">{{v.id}}</option> <!-- ngValue unterstützt im Vergleich zu value alle Datentypen, value nur strings-->
      </select>
    </label>
  </div>`
})

export class DynamicSelectbox {
  @Input() selectLabel = '';
  @Input() values: string[];
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @ViewChild('selectContainer', {read: ViewContainerRef}) selectContainer; // @ViewChild --> Verbindung zum selector; ViewcontainerRef, denifiert es als ViewContainer
  selectboxFactory: ComponentFactory<DynamicSelectbox>;

  constructor(private resolver: ComponentFactoryResolver, private jsonService: JsonService) {
  this.selectboxFactory = this.resolver.resolveComponentFactory(DynamicSelectbox);
}

addSelectbox(selectLabel: string, data: any) {
  const selectboxRef = this.selectContainer.createComponent(this.selectboxFactory); // mit createComponent erzeuge ist das Element
  selectboxRef.instance.selectLabel = selectLabel;
  selectboxRef.instance.values = data;

}

ngOnInit() {

  this.jsonService.getJson('/assets/test.json').subscribe(data => this.addSelectbox('Hier die Box', data));

}

}
