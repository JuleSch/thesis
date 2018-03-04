import {Component, Input} from '@angular/core';
import {FileService} from '../../services/file.service';
import {HttpClient} from '@angular/common/http';

@Component({
  template: `<table class="table, table table-striped, table table-hover, mt-5">
    <thead class="table-success">
    <th *ngFor="let headerCell of tableHeader">{{headerCell.id}}</th>
    <th></th>
    </thead>
    <tbody>
    <tr *ngFor="let row of tableData; let i = index">
      <ng-container *ngFor="let header of tableHeader">
        <!--Textfeld-->
        <td *ngIf="header.type == 'text' && !inputClick" (click)="inputClick = true">{{row[header.id]}}</td>
        <td *ngIf="header.type == 'text' && inputClick && !header.readonly"><input type="text" name="{{row[header.id]}}" value="{{row[header.id]}}"(change)="changeInput($event, i)" (blur)="inputClick = false"></td>
        <!--Checkbox-->
        <td *ngIf="header.type == 'boolean' && row[header.type]"><input (click)="changeActive($event, i)" type="checkbox" checked></td>
        <td *ngIf="header.type == 'boolean' && !row[header.type]"><input (click)="changeActive($event, i)" type="checkbox"></td>
        <!--Select-->
        <td *ngIf="header.type == 'select' && header.selectRef">
          <ng-container *ngIf="i == 0">{{saveSelectRef(header.selectRef)}}{{readFile(header.selectRef)}}</ng-container>
            <select class="custom-select" *ngIf="selectOptions !== undefined" #changeOption (change)="changeSelect($event, i, header.id, changeOption.value)">
              <option *ngFor="let option of selectOptions" [value]="option.id" [selected]="option.id == row[header.id]">{{option.label}}</option>
            </select>
            <select class="custom-select" *ngIf="selectOptions2 !== undefined" #changeOption2 (change)="changeSelect($event, i, header.id, changeOption2.value)">
            <option *ngFor="let option of selectOptions2" [value]="option.id" [selected]="option.id == row[header.id]">{{option.label}}</option>
            </select>
        </td>
        <ng-container>{{resetSelectRef()}}{{changeCount()}}</ng-container>
      </ng-container>
      <td><button type="button" class="btn btn-danger" (click)="removeTableRow(i)"><i class="fas fa-trash-alt"></i></button></td>
    </tr>
    </tbody>
  </table>
  <span class="mr-5">
      <button class="btn btn-success" (click)="updateTable()"><i class="fas fa-plus"></i></button>
    </span>
  <div class="fixed-top">
    <button class="btn btn-dark" (click)="changeShowJson(this.tableData)"><i class="fab fa-js"></i></button>
    <div class="alert alert-warning" role="alert" *ngIf="showJson">{{ jsonData | json }}</div>
  </div>    `,
  selector: 'app-table',
  styleUrls: ['./table.component.css']
})


export class TableComponent {

  constructor( private http: HttpClient) {}

  // Variablendeklaration für die Tabellendaten, die im Template benutzt werden.
  @Input() tableData = [] ;
  @Input() tableHeader = [];
  @Input() tableSelectData = [];
  @Input() tableSelectDefault = [];
  @Input() tableTarget = [];
  @Input() selectData = [];

  nextID = 9;
  showJson = false;
  jsonData: any;
  inputClick = false;
  selectOptions = undefined;
  selectOptions2 = undefined;
  cellSelectRef = undefined;
  httpCall = false;
  selectCount = 1;



  readFile(arrayName) {
    if (this.selectOptions === undefined && this.httpCall === false) {
      let promise = new Promise((resolve) => {
        this.http.get(this.cellSelectRef).subscribe(data => resolve(data));
      });
      Promise.all([promise]).then((values) => {
        if (this.selectOptions === undefined) {
          this.selectOptions = values[0][arrayName];
        }
        else {
          this.selectOptions2 = values[0][arrayName];
          console.log('selectOptions: ' , this.selectOptions , 'selectotions2: ' , this.selectOptions2);
        }
          this.httpCall = true;
        }
      );
    }
  }

  changeCount(){
    this.selectCount++;
  }

  saveSelectRef(selectRef) {
    this.cellSelectRef = '/assets/' + selectRef + '.json';
  }

  resetSelectRef() {
    this.httpCall = false;
    console.log('gelöschtes Selectref: ');
  }

  changeInput(event, index) {
    this.tableData[index].label = event.target.value;
  }

  changeSelect(event, index, tablevalue, newSelectedOption) {
    console.log('Tablevalue: ' , tablevalue);
    console.log(this.tableData[index][tablevalue]);
    this.tableData[index][tablevalue] = newSelectedOption;
  }

  changeActive(event, index) {
    this.tableData[index].active = event.target.checked;
  }

  removeTableRow(index) {
    this.tableData.splice(index, 1);
  }

  updateTable() {
    this.tableData.push({
      'id': 'vin/' + this.getId(),
      'label': 'Neues Label'
    });
  }

  changeShowJson(data) {
    this.showJson = this.showJson != true;
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
    ref.instance.tableHeader = data[0].attributes;
    ref.instance.tableData = data[1].analogCams;
    ref.instance.tableSelectData = data[2].test;
    ref.instance.tableSelectDefault = data[3].default;
    ref.instance.tableTarget = data[4].target;

  }


}
