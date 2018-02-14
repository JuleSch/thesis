import {Component, ComponentFactory, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FileService} from '../services/file.service';



@Component({
  selector: 'dynamic-table-header',
  template: `

    <th *ngFor="let m of myData">
      {{m.id}}
    </th>
  `
})
export class DynamicTableHeader {
  @Input() myData = [];

}


@Component({
  selector: 'dynamic-table-data',
  template: `
    <tr *ngFor="let m of tableData">
      <td>{{m.id}}</td>
      <td> {{m.label}}</td>
      <td *ngIf="m.active; else check"><input type="checkbox" checked></td>
      <ng-template #check><input type="checkbox"  ></ng-template>
      <td> {{m.profile}}</td>
      <td> {{m.target}}
      </td>
    </tr>`
})
export class DynamicTableData {
  @Input() tableData = [] ;

}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild('tableHeaderContainer', {read: ViewContainerRef}) tableHeaderContainer; // @ViewChild --> Verbindung zum selector; ViewcontainerRef, denifiert es als ViewContainer
  tableHeaderFactory: ComponentFactory<DynamicTableHeader>;

  @ViewChild('tableDataContainer', {read: ViewContainerRef}) tableDataContainer; // @ViewChild --> Verbindung zum selector; ViewcontainerRef, denifiert es als ViewContainer
  tableDataFactory: ComponentFactory<DynamicTableData>;

  constructor(private resolver: ComponentFactoryResolver, private fileService: FileService) {
    this.tableHeaderFactory = this.resolver.resolveComponentFactory(DynamicTableHeader);
    this.tableDataFactory = this.resolver.resolveComponentFactory(DynamicTableData);

  }


  addTableHeader(tableHeader: any) {
    const tableHeaderRef = this.tableHeaderContainer.createComponent(this.tableHeaderFactory); // mit createComponent wird das Element erz.
    tableHeaderRef.instance.myData = tableHeader.attributes;
  }

  addTableData(tableData: any) {
    const tableDataRef = this.tableDataContainer.createComponent(this.tableDataFactory); // mit createComponent erzeuge ist das Element
    tableDataRef.instance.tableData = tableData.analogCams;
  }



  ngOnInit() {
    // TODO: kann man das noch optimieren???
     this.fileService.getFile('/assets/table.json').subscribe(data => this.addTableHeader(data));
     this.fileService.getFile('/assets/tableData.json').subscribe(data => this.addTableData(data));

  }

}
