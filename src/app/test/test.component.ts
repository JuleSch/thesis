import {Component, Input, OnInit} from '@angular/core';
import { FileService} from '../services/file.service';
import { TableComponent} from '../table/table.component';

@Component({
  selector: 'app-test',
  template: ``
})


export class TestComponent implements OnInit{
  table: TableComponent;


  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.addTable();
  }


  addTable() {
    //this.fileService.getFile('/assets/table.json').subscribe(data => this.table.addTableHeader(data));
    //this.fileService.getFile('/assets/tableData.json').subscribe(data => this.table.addTableData(data));
  }
}



