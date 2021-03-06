import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  template: `
    <!--<app-json-button *ngIf="showButton" (jsonClick)="getJsonData()" ></app-json-button>-->
    <!-- Undo-Button -->
   <!-- <div class="mt-5">
      <!--<button class="btn btn-dark" (click)="saveTable()"><i class="fas fa-save"></i></button>
      <button class="btn btn-danger" (click)="resetTable()"><i class="fas fa-undo"></i></button>
    </div>-->
    <!-- Tabelle -->
    <table class="table table-responsive table table-striped table table-hover mt-2">
      <thead class="table-success">
      <th *ngFor="let headerCell of tableHeader">{{headerCell.id}}</th>
      <th></th>
      </thead>
      <tbody>
      <tr *ngFor="let row of tableRows; let i = index">
        <ng-container *ngFor="let header of tableHeader; let headerIndex = index">
          <!--Textfeld-->
          <!--TODO: inputClick zu mehrdimensionalen Array! -->
          <td *ngIf="header.type == 'text' && !inputClick[i]" (click)="inputClick[i] = true">{{row[header.id]}}</td>
          <td *ngIf="header.type == 'text' && inputClick[i] && !header.readonly"><input type="text" name="{{row[header.id]}}" value="{{row[header.id]}}" [(ngModel)]="row[header.id]" (blur)="inputClick[i] = false"></td>
          <!--Checkbox-->
          <td *ngIf="header.type == 'boolean'"><input [(ngModel)]="row[header.id]" type="checkbox"></td>
          <!--Select-->
          <td *ngIf="header.type == 'select'">
            <select class="custom-select"  [(ngModel)]="row[header.id]">
              <ng-container *ngFor="let entry of saveSelectRef(header.selectRef)">
                <option *ngFor="let option of tableData[entry]" [value]="option.id" [selected]="option.id == row[header.id]">{{option.label}}</option>
              </ng-container>
              <option *ngFor="let option of saveDefault(header.selectRef)" [value]="option.id" [selected]="option.id == row[header.id]">{{option.label}}</option>
            </select>
          </td>
        </ng-container>
        <td><button type="button" class="btn btn-sm btn-danger" (click)="removeTableRow(i)"><i class="fas fa-trash-alt"></i></button></td>
      </tr>
      </tbody>
    </table>
    <!-- Hinzufügen-Button -->
    <button class="btn btn-success btn-sm mr-5 mb-5" (click)="updateTable()"><i class="fas fa-plus"></i></button>
  `,
  selector: 'app-table',
  styleUrls: ['./table.component.css']
})


export class TableComponent implements OnInit {

  constructor() {}

  // Variablendeklaration für die Tabellendaten, die im Template benutzt werden.
  @Input() tableData: any;
  @Input() tableHeader = [];
  @Input() tableRows = [];
  @Input() helperTables: any;
  @Input() originalData: any;
  @Input() originalRows: any;


  @Output() jsonDataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() getData: EventEmitter<any> = new EventEmitter<any>();

  nextID = 9;
  inputClick = [];
  selectRef = [];

  ngOnInit() {

    setTimeout(() => this.getTheData(), 2000);

  }

  getTheData () {
    this.getData.emit(this.tableData);
  }
  getJsonData() {
    this.jsonDataChange.emit(this.tableData);
  }


  saveDefault(ref) {
    const selectDefault = [];
    if (ref.ids) {
      for (const entry of ref.ids) {
        selectDefault.push(
          {
            'id': ref.ids[entry],
            'label' : ref.labels[entry]
          }
        );
      }
    }
    return selectDefault;

  }

  saveSelectRef(ref) {
    const selectSources = ref.source;
    return selectSources;
  }

  removeTableRow(index) {
    this.tableRows.splice(index, 1);
  }

  /*
    renderHelperTable() {
      Object.keys(data[1]).forEach((key, value) => {
        if (key === 'data') return;
        const helperTable = this.viewContainerRef.createComponent(factory);
        this.tableComponent.initTableParams(data, helperTable, changeCallback);
      });
    }*/

  updateTable() {
    this.tableRows.push({
      'Eingang': 'vin/' + this.getId(),
      'Label': 'Neues Label'
    });
  }

  resetTable() {
    console.log('resetTable');
    console.log(this.originalData.data);
    this.tableRows = this.originalRows;
    this.tableData = this.originalData;
    console.log(this.tableData);

  }

  saveTable() {
    this.originalData = this.tableData;
    console.log(this.originalData);


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

    // Duplizieren: ref.instance.originalData = JSON.parse(JSON.stringify(data[1]));
    // JSON filtern: ref.instance.helperTables = Object.keys(data[1]).filter(key => key !== 'data');

    ref.instance.originalData = JSON.parse(JSON.stringify(data[1]));
    ref.instance.originalRows = JSON.parse(JSON.stringify(data[2]));
    ref.instance.tableHeader = data[0];
    ref.instance.tableData = data[1];
    ref.instance.tableRows = data[2];

  }


}
