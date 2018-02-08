import { Component , OnInit} from '@angular/core';
import {JsonService} from '../services/json.service';


@Component({
  selector: 'app-test',
  template: `<table>
    <tr>
      <th>Id</th>
      <th>Vorname</th>
      <th>Name</th>
    </tr>
    <tr *ngFor="let data of myJson">
      <td>{{data.id | json}}</td>
      <td>{{data.firstName | json}}</td>
      <td>{{data.lastName | json}}</td>
    </tr>
  </table>

  `
})


export class TestComponent implements OnInit{
  myJson;

  constructor(private jsonService: JsonService) {}

  ngOnInit(){
    this.showJson();
  }


  showJson(){
    this.jsonService.getJson('/assets/test.json')
      .subscribe(data =>  this.myJson = data);
  }
}








