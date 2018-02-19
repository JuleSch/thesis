import {Component, ComponentFactory, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';


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

  // Variablendeklaration für die Tabellendaten, die im Template benutzt werden.
  @Input() tableData = [] ;
  @Input() tableHeader = [];
  // ComponentFactory für die Klasse TableComponent.
  tableFactory: ComponentFactory<TableComponent>;

  constructor(private resolver: ComponentFactoryResolver) {
    /* Mit der Klasse ComponentFactoryResolver, habe ich die Möglichkeit, über tableFactory Zugriff auf das Template von TableComponent
    zu bekommen. */
    this.tableFactory = this.resolver.resolveComponentFactory(TableComponent);
  }

  // addTable erwartet Daten und ein ViewContainerRef-Objekt
  addTable(data: any, viewContainerRef: ViewContainerRef) {
    /* Das ViewContainerRef-Objekt ist ein Objekt, dass die Referenzierung auf ein bestimmtes Childelement beinhaltet.
           Also an die Stelle, an die in diesem Fall die Tabelle erzeugt werden soll.
           Mit createComponent erzeuge ich das Tabellen-Element*/
    const tableRef = viewContainerRef.createComponent(this.tableFactory);
    /* mit "instance" übergebe ich mein Input an das Element.
    In diesem Fall das erste Objekt des Arrays für die Header und das 2. für die Daten.
    Das dritte werde ich später für options der Selectboxen in der Tabelle benutzen,
    */
    tableRef.instance.tableHeader = data[0].attributes;
    tableRef.instance.tableData = data[1].analogCams;
  }


  ngOnInit() {
  }

}
