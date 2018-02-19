import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FileService} from './services/file.service';
import {TableComponent} from './table/table.component';
import {ButtonComponent} from './button/button.component';

@Component({
  // Ich habe hier die provider definiert und nicht in app.module, weil die Componenten nicht für alle Klassen benutzt werden sollen.
  providers: [ButtonComponent, TableComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'Neuer Versuch';
  promiseOne;
  promiseTwo;
  promiseThree;
  /* Hier erstelle ich mein ViewContainerRef-Objekt, dass ich später im Methodenaufruf übergeben werde.
     Ich gebe in diesem Fall für @Viewchild keinen Variablennamen an, sondern den Namen der Klasse, in dem das Tempalte enthalten ist,
     da ich
     1. das einzelne Element einer anderen Klasse nicht addressieren kann und
     2. eh das Erzeugen des ganzen Templates möchte.*/
  @ViewChild((ButtonComponent), {read: ViewContainerRef}) buttonContainer: ViewContainerRef;
  // Hier das gleiche für eine Tabelle.
  @ViewChild((TableComponent), {read: ViewContainerRef}) tableContainer: ViewContainerRef;

  // Im Constructor muss ich Objekte der TableComponent und ButtonComponent erzeugen.
  // TODO: Herausfinden, warum ich die Objekte der Klassen nicht auch außerhalb definieren kann.
  constructor(private fileService: FileService,  private tableComponent: TableComponent, private buttonComponent: ButtonComponent) {}

  ngOnInit() {
    // Bei diesem Aufruf der Buttenmethode übergebe ich den Buttontext und mein ViewContainerRef-Objekt als Parameter.
    this.buttonComponent.addButton('Hallo', this.buttonContainer);
    this.processData();
  }

  // Ich lese 3 Files aus, die ich anschließend als ein Array mit drei JS-Objekten im Callback zurückbekomme.
  // Dieses übergebe ich dann als Parameter in einem Methodenaufruf.
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

    // Callback der 3 Files
    Promise.all([this.promiseOne, this.promiseTwo, this.promiseThree]). then((values) => {
        console.log(values);
        // Hier rufe ich die Tablemethode auf und übergebe das Array und mein ViewContainerRef-Objekt der Tabelle als Parameter.
        this.tableComponent.addTable(values, this.tableContainer);
      }
    );
  }

}
