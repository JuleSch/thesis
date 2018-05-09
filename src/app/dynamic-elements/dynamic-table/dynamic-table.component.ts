import {Component, ComponentFactoryResolver, EventEmitter, Injectable, Output, ViewContainerRef} from '@angular/core';
import {TableComponent} from '../../elements/table/table.component';
import {JsonButtonComponent} from '../../test/json-button';


@Component({
  selector: 'app-dynamic-table',
  template: ``,
  styleUrls: ['./dynamic-table.component.css']
})

@Injectable()
export class DynamicTableComponent  {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private tableComponent: TableComponent,
              private jsonButton: JsonButtonComponent) {
  }

  createTable(data: any, showbutton: boolean) {
    /* Mit der Klasse ComponentFactoryResolver, habe ich die Möglichkeit, über tableFactory Zugriff auf das Template von TableComponent
    zu bekommen. */
    const factory = this.componentFactoryResolver.resolveComponentFactory(TableComponent);
    /* Das ViewContainerRef-Objekt ist ein Objekt, dass die Referenzierung auf ein bestimmtes Childelement beinhaltet.
           Also an die Stelle, an die in diesem Fall die Tabelle erzeugt werden soll.
           Mit createComponent erzeuge ich das Tabellen-Element*/
    const ref = this.viewContainerRef.createComponent(factory);
    this.tableComponent.initTableParams(data, ref, showbutton);
       // Eventemit-methode für dynamische tempaltes
    // TODO: herausfinden ob der nächste auskommentierte Code nützlich ist.
    // ref.changeDetectorRef.detectChanges();
  }

  sendJsonData(v) {
    this.jsonButton.showAlert(v);
  }


}
