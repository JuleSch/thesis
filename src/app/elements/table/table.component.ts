import {Component, Input,} from '@angular/core';


@Component({
  selector: 'app-table',
  template: `
    <table>
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


export class TableComponent {

  // Variablendeklaration für die Tabellendaten, die im Template benutzt werden.
  @Input() tableData = [] ;
  @Input() tableHeader = [];

  // initTableParams erwartet Daten und ein ViewContainerRef-Objekt
  initTableParams(data: any, ref: any) {
    /* mit "instance" übergebe ich mein Input an das Element.
    In diesem Fall das erste Objekt des Arrays für die Header und das 2. für die Daten.
    Das dritte werde ich später für options der Selectboxen in der Tabelle benutzen,
    */
    ref.instance.tableHeader = data[0].attributes;
    ref.instance.tableData = data[1].analogCams;
  }
}
