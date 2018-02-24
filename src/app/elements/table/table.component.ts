import {Component, Input } from '@angular/core';


@Component({
  selector: 'app-table',
  template: `
    <table class="table, table table-striped, table table-hover, mt-5">
      <thead class="table-success">
      <th *ngFor="let m of tableHeader">{{m.id}}</th>
      <th></th>
      </thead>
      <tbody>
      <tr *ngFor="let m of tableData; let i = index">
        <td><i class="fas fa-video"></i> {{m.id}}</td>
        <td contenteditable='true' (input)="changeInput($event, i)">{{m.label}}</td>
        <td  *ngIf="m.active; else check"><input (click)="changeActive($event, i)" type="checkbox" checked ></td>
        <ng-template #check><td><input (click)="changeActive($event, i)" type="checkbox"></td></ng-template>
        <td>
          <select>
            <option *ngFor="let v of tableSelectData" [value]="v" [selected]="v.label == m.profile">{{v.label}}</option>
            <option *ngFor="let v of tableSelectDefault" [value]="v">{{v.label}}</option>
          </select>
        </td>
        <td>{{m.target}}</td>
        <td><button type="button" class="btn btn-danger" (click)="removeTableRow(i)"><i class="fas fa-trash-alt"></i></button></td>
      </tr>
      </tbody>
    </table>
    <button (click)="updateTable()">Hinzufügen</button>
    <button (click)="changeShowJson(this.tableData)">Json</button>
    <span *ngIf="showJson">{{ data |json }}</span>`,
  styleUrls: ['./table.component.css']
})


export class TableComponent {


  // Variablendeklaration für die Tabellendaten, die im Template benutzt werden.
  @Input() tableData = [] ;
  @Input() tableHeader = [];
  @Input() tableSelectData = [];
  @Input() tableSelectDefault = [];

  nextID = 9;
  showJson = false;
  data: any;
  newString = '';

  changeInput(event, index) {
    this.newString = '';
    this.newString += event.target.textContent;
    this.tableData[index].label = this.newString;
  }

  changeActive(event, index) {
    let newCheckboxStatus = event.target.checked;
    console.log(newCheckboxStatus);
    if (newCheckboxStatus === true) {
      newCheckboxStatus = false;
    }
    else {
      newCheckboxStatus = true;
    }
    // newCheckboxStatus = !newCheckboxStatus;
    console.log(newCheckboxStatus);
    this.tableData[index].active = newCheckboxStatus;
  }

  removeTableRow(index) {
    this.tableData.splice(index, 1);
  }

  updateTable() {
    this.tableData.push({
      "id":"vin/"+ this.getId()
    });
  }

  changeShowJson(data) {
    this.showJson = this.showJson != true;
    this.data = data;
  }

  getId() {
    this.nextID++;
    return this.nextID;
  }

  // initTableParams erwartet Daten und ein ViewContainerRef-Objekt
  initTableParams(data: any, ref: any) {
    /* mit "instance" übergebe ich mein Input an das Element.
    In diesem Fall das erste Objekt des Arrays für die Header und das 2. für die Daten.
    Das dritte werde ich später für options der Selectboxen in der Tabelle benutzen,
    */
    ref.instance.tableHeader = data[0].attributes;
    ref.instance.tableData = data[1].analogCams;
    ref.instance.tableSelectData = data[2].test;
    ref.instance.tableSelectDefault = data[3].default;

  }


}
