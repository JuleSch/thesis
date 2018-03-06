import {Component, Input, ViewContainerRef} from '@angular/core';
import {FileService} from '../../services/file.service';
import {HttpClient} from '@angular/common/http';

@Component({
  template: `
    <button class="btn btn-dark" (click)="saveTable()"><i class="fas fa-save"></i></button>
    <button class="btn btn-danger" (click)="resetTable()"><i class="fas fa-undo"></i></button>
    <table class="table table table-striped table table-hover mt-2">
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
          <td *ngIf="header.type == 'text' && inputClick[i] && !header.readonly"><input type="text" name="{{row[header.id]}}" value="{{row[header.id]}}" (change)="changeLabel($event, i)" (blur)="inputClick[i] = false"></td>
          <!--Checkbox-->
          <td *ngIf="header.type == 'boolean' && row[header.type]"><input (click)="changeActive($event, i)" type="checkbox" checked></td>
          <td *ngIf="header.type == 'boolean' && !row[header.type]"><input (click)="changeActive($event, i)" type="checkbox"></td>
          <!--Select-->
          <td *ngIf="header.type == 'select'">
            <select class="custom-select"  #changeOption (change)="changeSelect($event, i, header.id, changeOption.value)">
              <ng-container *ngFor="let entry of saveSelectRef(header.selectRef)">
                <option *ngFor="let option of tableData[entry]" [value]="option.id" [selected]="option.id == row[header.id]">{{option.label}}</option>
              </ng-container>
              <option *ngFor="let option of saveDefault(header.selectRef)" [value]="option.id" [selected]="option.id == row[header.id]">{{option.label}}</option>
            </select>
          </td>
        </ng-container>
        <td><button type="button" class="btn btn-danger" (click)="removeTableRow(i)"><i class="fas fa-trash-alt"></i></button></td>
      </tr>
      </tbody>
    </table>
<!-- Button -->
    <button class="btn btn-success btn-sm mr-5" (click)="updateTable()"><i class="fas fa-plus"></i></button>
    <div class="fixed-top">
      <button class="btn btn-dark" (click)="changeShowJson(this.tableRows)"><i class="fab fa-js"></i></button>
      <div class="alert alert-warning" role="alert" *ngIf="showJson">{{ jsonData | json }}</div>
    </div>
    <!-- HelperTabellen -->
    <div class="d-flex flex-row">
      <ng-container *ngFor="let tableName of helperTables">
        <table class="table table-responsive table table-striped table table-hover mt-5">
          <thead class="table-success">
          <th>id</th>
          <th>label</th>
          <th></th>
          </thead>
          <tbody>
          <tr *ngFor="let row of tableData[tableName]; let i = index">
            <td>{{row.id}}</td>
            <td><input type="text" name="{{row.id}}" value="{{row.label}}" (change)="changeHelperLabel($event, tableName, i)" (blur)="inputClick = false"></td>
            <td><button type="button" class="btn btn-danger" (click)="removeHelperTableRow(tableName, i)"><i class="fas fa-trash-alt"></i></button></td>
          </tr>
          </tbody>
        </table>
      </ng-container>
    </div>
  `,
  selector: 'app-table',
  styleUrls: ['./table.component.css']
})


export class TableComponent {

  constructor( private http: HttpClient) {}

  // Variablendeklaration für die Tabellendaten, die im Template benutzt werden.
  @Input() tableData: any;
  @Input() tableHeader = [];
  @Input() tableRows = [];
  @Input() helperTables: any;
  @Input() originalData: any;

  nextID = 9;
  showJson = false;
  jsonData: any;
  inputClick = [];
  selectRef = [];

  pushRowInInputClick() {
    this.inputClick.push([]);
    console.log(this.inputClick);
  }

  pushHeaderInInputClick(tableRow) {
    this.inputClick[tableRow].push(false);
    console.log(this.inputClick);

  }

  saveDefault(ref) {
    let selectDefault = [];
    if (ref.ids) {
      for (let entry of ref.ids) {
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
    let selectSources = ref.source;
    return selectSources;
  }

  /*
  readFile(arrayName) {
    if (this.selectOptions === undefined && this.httpCall === false) {
      const promise = new Promise((resolve) => {
        this.http.get(this.cellSelectRef).subscribe(data => resolve(data));
      });
      Promise.all([promise]).then((values) => {
        if (this.selectOptions === undefined) {
          this.selectOptions = values[0][arrayName];
        } else {
          let selectOptions2 = values[0][arrayName];
          console.log('selectOptions: ' , this.selectOptions , 'selectotions2: ' , this.selectOptions2);
        }
          this.httpCall = true;
        }
      );
    }
  }

  resetSelectRef() {
    this.httpCall = false;
    console.log('gelöschtes Selectref: ');
  }*/

  changeHelperLabel(event, tableName, rowId) {
    this.tableData[tableName][rowId].label = event.target.value;
    this.tableRows = this.tableRows;
  }

  removeHelperTableRow(tableName, rowId) {
    this.tableData[tableName].splice(rowId, 1);
    this.tableRows = this.tableRows;
  }

  updateHelperTable(tableName) {
    let helperId = 9;
    helperId = helperId++;
    this.tableData[tableName].push({
      'id': 'profile/' + helperId,
      'label': 'Neues Label'
    });
  }

  changeLabel(event, index) {
    console.log('changeLabel', this.tableRows);
    this.tableRows[index].label = event.target.value;
  }

  changeSelect(event, index, tablevalue, newSelectedOption) {
    console.log('changeSelect', this.tableRows);
    console.log('Tablevalue: ' , tablevalue);
    console.log(this.tableRows[index][tablevalue]);
    this.tableRows[index][tablevalue] = newSelectedOption;
  }

  changeActive(event, index) {
    this.tableRows[index].active = event.target.checked;
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
      'id': 'vin/' + this.getId(),
      'label': 'Neues Label'
    });
  }


  resetTable() {
    console.log('resetTable');
    this.tableRows = this.originalData.data;
    this.tableData = this.originalData;
  }

  saveTable() {
    this.originalData = this.tableData;
  }

  changeShowJson(data) {
    this.showJson = this.showJson !== true;
    this.jsonData = data;
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

    ref.instance.originalData = JSON.parse(JSON.stringify(data[1]));
    ref.instance.helperTables = Object.keys(data[1]).filter(key => key !== 'data');

    ref.instance.tableHeader = data[0].attributes;
    ref.instance.tableRows = data[1].data;
    ref.instance.tableData = data[1];

  }


}
