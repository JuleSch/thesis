import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {DynamicButtonComponent} from '../dynamic-elements/dynamic-button/dynamic-button.component';
import {DynamicCheckboxComponent} from '../dynamic-elements/dynamic-checkbox/dynamic-checkbox.component';
import {FileService} from '../services/file.service';
import {DynamicTextfieldComponent} from '../dynamic-elements/dynamic-textfield/dynamic-textfield.component';
import {DynamicSelectComponent} from '../dynamic-elements/dynamic-select/dynamic-select.component';



@Component({
  providers: [
    DynamicButtonComponent,
    DynamicCheckboxComponent,
    DynamicTextfieldComponent,
    DynamicSelectComponent
  ],
  selector: 'app-test',
  template: `<div></div>`
})

export class TestComponent implements OnInit {
  /**
   *  Diese beiden Variablen können später durch Eingabevariablen ersetzt werden.
   */
  configFile = '/assets/form.json';
  dataFile = '/assets/formData.json';

  constructor(private dynamicCheckbox: DynamicCheckboxComponent,
              private dynamicTextfield: DynamicTextfieldComponent,
              private dynamicSelect: DynamicSelectComponent,
              private viewContainerRef: ViewContainerRef,
              private fileService: FileService) {}

  /**
   * Diese Methode wird bei der Initiatlisierung der Klasse aufgerufen und ruft die Methode processDataFile auf.
   */
  ngOnInit() {
    this.processDataFile(this.configFile, this.dataFile);
  }

  /**
   * Diese Methode liest zwei Json-Dateien ein und baut damit dynamisch ein Formular aus verschiedenen HTML-Elementen.
   * @param {string} configFile   Die Json-Datei, in der die Elementtypen definiert sind.
   * @param {string} dataFile     Die Json-Datei, in der die Daten für die Elementtypen definiert sind.
   */
  processDataFile(configFile: string, dataFile: string) {
    let promise1 = new Promise((resolve, reject) => {
      this.fileService.getFile(configFile).subscribe(data => resolve(data));
    });

    let promise2 = new Promise((resolve, reject) => {
      this.fileService.getFile(dataFile).subscribe(data => resolve(data));
    });

    Promise.all([promise1, promise2]).then((values) => {
      // values1 = das promise2, formData= ist die Id, des Arrays, [0] ist das erste Element
      const formData = values[1]['formData'][0];

      for (let entry of values[0]['attributes']) {
        if (entry.hasOwnProperty('type')) {
          switch (entry.type) {
            case 'boolean':
              console.log(formData['active']);
              this.dynamicCheckbox.createCheckbox(entry.label, formData['active'] );
              break;
            case 'text':
              this.dynamicTextfield.createTextfield(entry.label, entry.readOnly, formData[entry.id], 'text');
              break;
            case 'number':
              this.dynamicTextfield.createTextfield(entry.label, entry.readOnly, formData[entry.id], 'number');
              break;
            case 'select':
              if (entry.selectRef.hasOwnProperty('source')) {
                this.processSelectData(entry.label, entry.selectRef['source'], formData[entry.id]);
              }
              else {
                console.error('Es gibt keine source!');
              }
              break;
            default: console.error('Die ID' ,  entry.id , 'stimmt nicht überein.');
          }
        }
        else {
          console.error('HasOwnProperty Fehler!');
        }
      }
    });
  }

  /**
   * Diese Methode liest eine json-Datei ein und erzeugt eine dynamische Selectbox.
   * @param {string} label          Das Label der Selectbox.
   * @param {Array<string>} selectSource   Ein Array der Quellen für die Selectbox.
   * @param {string} defaultValue   Der voreingestellte Wert für die Selectbox.
   */
  processSelectData(label: string, selectSource: Array<string>, defaultValue: string) {
    new Promise((resolve, reject) => {
      this.fileService.getFile('/assets/tableData.json').subscribe(data => resolve(data)); })
      .then((value) => {
        console.log(selectSource);
        let selectData = [];
        for (let entry of selectSource) {
          for (let entryData of value[entry]) {
            selectData.push(entryData);
          }
        }
        console.log(selectData);
        this.dynamicSelect.createSelect(selectData, label, defaultValue);
      });
  }


}


