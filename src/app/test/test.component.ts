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
    const configFilePromise = new Promise((resolve, reject) => {
      this.fileService.getFile(configFile).subscribe(
        data => resolve(data),
        error => reject('Beim Auslesen des configFiles trat ein Fehler auf: ' + error)
      );
    });
    const dataFilePromise = new Promise((resolve, reject) => {
      this.fileService.getFile(dataFile).subscribe(
        data => resolve(data),
        error => reject('Beim Auslesen des dataFiles trat ein Fehler auf: ' + error)
      );
    });
    // Callback
    Promise.all([configFilePromise, dataFilePromise])
      .then((values) => {
        // values[1] = das dataFilePromise;
        // formData= ist die Id, des Arrays;
        // [0] ist das erste Element
        const formData = values[1]['formData'][0];
        for (const entry of values[0]['attributes']) {
          if (entry.hasOwnProperty('type')) {
            switch (entry.type) {
              case 'boolean':
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
                } else {
                  console.error('Es gibt keine source!');
                }
                break;
              default: console.error('Die ID' ,  entry.id , 'stimmt nicht überein.');
            }
          } else {
            console.error('HasOwnProperty Fehler!');
          }
        }
      })
      .catch((reason) => {
        console.error(reason);
      });
  }

  /**
   * Diese Methode liest eine json-Datei ein und erzeugt eine dynamische Selectbox.
   * @param {string} label                  Das Label der Selectbox.
   * @param {Array<string>} selectSource    Ein Array der Quellen für die Selectbox.
   * @param {string} defaultValue           Der voreingestellte Wert für die Selectbox.
   */
  processSelectData(label: string, selectSource: Array<string>, defaultValue: string) {
    new Promise((resolve, reject) => {
      this.fileService.getFile('/assets/tableData.json').subscribe(
        data => resolve(data),
        error => reject('Beim Auslesen der Daten für die Selektbox trat ein Fehler auf: ' + error)
      ); })
      .then((value) => {
        const selectData = [];
        for (const entry of selectSource) {
          for (const entryData of value[entry]) {
            selectData.push(entryData);
          }
        }
        this.dynamicSelect.createSelect(selectData, label, defaultValue);
      })
      .catch((reason) => {
        console.error(reason);
      });
  }
}


