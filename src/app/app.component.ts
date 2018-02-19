import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {FileService} from './services/file.service';
import {TableComponent} from './table/table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Neuer Versuch';
  promiseOne;
  promiseTwo;
  promiseThree;

  constructor(private fileService: FileService, private tableComponent: TableComponent) {}


  ngOnInit() {

    this.processData();
  }

  processData() {
    this.promiseOne = new Promise((resolve, reject) => {
      this.fileService.getFile('/assets/table.json').subscribe(data => resolve(data));
    });
    this.promiseTwo = new Promise((resolve, reject) => {
      this.fileService.getFile('/assets/tableData.json').subscribe(data => resolve(data));
    });
    this.promiseThree = new Promise((resolve, reject) => {
      this.fileService.getFile('/assets/test.json').subscribe(data => resolve(data));
    });

    Promise.all([this.promiseOne, this.promiseTwo, this.promiseThree]). then((values) => {
      console.log(values);
     // this.tableComponent.addTable(values[0]);
    }
    );
  }

}
