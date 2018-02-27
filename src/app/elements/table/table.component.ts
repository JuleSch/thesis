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
        <!--Label-->
        <td *ngIf="!inputClick; else changeText" (click)="inputClick = true">{{m.label}}</td>
        <ng-template #changeText><td><input type="text" name="{{m.label}}" value="{{m.label}}" (change)="changeInput($event, i)" (blur)="inputClick = false"></td></ng-template>
        <!--Active-->
        <td  *ngIf="m.active; else check"><input (click)="changeActive($event, i)" type="checkbox" checked ></td>
        <ng-template #check><td><input (click)="changeActive($event, i)" type="checkbox"></td></ng-template>
        <!--Select-->
        <td>
          <select>
            <option *ngFor="let v of tableSelectData" [value]="v" [selected]="v.label == m.profile" (click)="changeSelect($event, i, v.label)">{{v.label}}</option>
            <option *ngFor="let v of tableSelectDefault" [value]="v" (click)="changeSelect($event, i, v.label)">{{v.label}}</option>
          </select>
        </td>
        <!--Target-->
        <td>
          <select>
            <option *ngFor="let v of tableTarget" [value]="v" [selected]="v.id == m.target" (click)="changeTarget($event, i, v.id)">{{v.label}}</option>
          </select>
        </td>
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
  @Input() tableTarget = [];

  nextID = 9;
  showJson = false;
  data: any;
  inputClick = false;

  changeInput(event, index) {
    this.tableData[index].label = event.target.value;
  }

  changeSelect(event, index, newSelectedOption) {
    this.tableData[index].profile = newSelectedOption;
  }

  changeTarget(event, index, newSelectedOption) {
    this.tableData[index].target = newSelectedOption;
  }

  changeActive(event, index) {
    this.tableData[index].active = event.target.checked;
  }

  removeTableRow(index) {
    this.tableData.splice(index, 1);
  }

  updateTable() {
    this.tableData.push({
      "id":"vin/"+ this.getId(),
      "label":"Neues Label"
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
    ref.instance.tableTarget = data[4].target;

  }


}
