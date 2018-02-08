import {Component, ComponentFactory, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {JsonService} from '../services/json.service';



@Component({
  selector: 'dynamic-table',
  template: `<table>
    <tr>
      <th *ngFor="let m of myData">
          {{m.id | json}}
      </th>
    </tr>
    <tr *ngFor="let m of tableData">
      <td>
        {{m.id | json}}</td>
      <td> {{m.label | json}}</td>
      <td> {{m.active | json}}</td>
      <td> {{m.profile | json}}</td>
      <td> {{m.target | json}}
      </td>
    </tr>
  </table>`
})
export class DynamicTable {
  @Input() myData = [];
  @Input() tableData = [];

}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild('tableContainer', {read: ViewContainerRef}) tableContainer; // @ViewChild --> Verbindung zum selector; ViewcontainerRef, denifiert es als ViewContainer
  tableFactory: ComponentFactory<DynamicTable>;

  constructor(private resolver: ComponentFactoryResolver, private jsonService: JsonService) {
    this.tableFactory = this.resolver.resolveComponentFactory(DynamicTable);
  }


  addTable(data: any, tableData: any) {
    const tableRef = this.tableContainer.createComponent(this.tableFactory); // mit createComponent erzeuge ist das Element
    tableRef.instance.myData = data;
    tableRef.instance.tableData = tableData;
  }


  ngOnInit() {
    //TODO: kann man das noch optimieren???
    this.jsonService.getJson('/assets/table.json').subscribe(data => this.addTable(data.attributes, data.analogCams));
  }

}
