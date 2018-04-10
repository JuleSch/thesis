import {Component, ComponentFactoryResolver, EventEmitter, Injectable, Output, ViewContainerRef} from '@angular/core';
import {TableComponent} from '../../elements/table/table.component';

@Component({
  selector: 'app-dynamic-table',
  template: `<div class="fixed-top">
    <button class="btn btn-dark" (click)="onJsonClick()"><i class="fab fa-js"></i></button>
  </div>`,
  styleUrls: ['./dynamic-table.component.css']
})

@Injectable()
export class DynamicTableComponent  {

  @Output() jsonClick: EventEmitter<any> = new EventEmitter<any>();


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private tableComponent: TableComponent) {
  }

  jsonData: any;

  createTable(data: any) {
    /* Mit der Klasse ComponentFactoryResolver, habe ich die Möglichkeit, über tableFactory Zugriff auf das Template von TableComponent
    zu bekommen. */
    const factory = this.componentFactoryResolver.resolveComponentFactory(TableComponent);
    /* Das ViewContainerRef-Objekt ist ein Objekt, dass die Referenzierung auf ein bestimmtes Childelement beinhaltet.
           Also an die Stelle, an die in diesem Fall die Tabelle erzeugt werden soll.
           Mit createComponent erzeuge ich das Tabellen-Element*/
    const ref = this.viewContainerRef.createComponent(factory);
    this.tableComponent.initTableParams(data, ref);
    ref.instance.jsonDataChange.subscribe(v => {
      console.log('daten in dynamischer Tabelle angekommen', v);
      this.getJsonData(v);
      });
    // TODO: herausfinden ob der nächste auskommentierte Code nützlich ist.
    // ref.changeDetectorRef.detectChanges();
  }

  onJsonClick() {
    this.jsonClick.emit();
  }

  getJsonData(v) {
    this.jsonData = v;
    alert(JSON.stringify(this.jsonData));
    return this.jsonData;
  }


}
