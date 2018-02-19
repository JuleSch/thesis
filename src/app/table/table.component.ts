import {Component, ComponentFactory, ComponentFactoryResolver, Injectable, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FileService} from '../services/file.service';




@Component({
  selector: 'app-table',
  template: `
    <table #tableContainer>
      <thead>
      <th *ngFor="let m of tableHeader">{{m.id}}</th>
      </thead>
      <tbody>
      <tr *ngFor="let m of tableData">
        <td>{{m.id}}</td>
        <td> {{m.label}}</td>
        <td *ngIf="m.active; else check"><input type="checkbox" checked></td>
        <ng-template #check><input type="checkbox"></ng-template>
        <td> {{m.profile}}</td>
        <td> {{m.target}}
        </td>
      </tr>
      </tbody>
    </table>`,
  styleUrls: ['./table.component.css']
})


export class TableComponent implements OnInit {

  @Input() tableData = [] ;
  @Input() tableHeader = [];
  @ViewChild('tableContainer', {read: ViewContainerRef}) tableContainer;
  tableFactory: ComponentFactory<TableComponent>;


  constructor(private resolver: ComponentFactoryResolver, private fileService: FileService) {
    this.tableFactory = this.resolver.resolveComponentFactory(TableComponent);
  }

  addTable(data: any) {
    //console.log(data.attributes);

    const tableRef = this.tableContainer.createComponent(this.tableFactory); // mit createComponent wird das Element erz.

    tableRef.instance.tableHeader = data.attributes;
    tableRef.instance.tableData = data.analogCams;

  }


  ngOnInit() {
    // TODO: kann man das noch optimieren???
    this.fileService.getFile('/assets/table.json').subscribe(data => this.addTable(data));
  }

}
