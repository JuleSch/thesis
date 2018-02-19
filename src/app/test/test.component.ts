import {Component,  OnInit} from '@angular/core';
import { FileService} from '../services/file.service';
import { TableComponent} from '../table/table.component';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-test',
  template: ``
})


export class TestComponent implements OnInit{

  constructor(private fileService: FileService, private buttonComponent: ButtonComponent) {}

  ngOnInit() {
    // this.buttonComponent.addButton('Hallo');
  }

}



