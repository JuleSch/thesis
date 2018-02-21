import {Component, ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {SelectComponent} from '../../elements/select/select.component';

@Component({
  selector: 'app-dynamic-select',
  templateUrl: './dynamic-select.component.html',
  styleUrls: ['./dynamic-select.component.css']
})

@Injectable()
export class DynamicSelectComponent {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private selectComponent: SelectComponent) {
  }

  createSelect(selectLabel: string, data: any, viewContainerRef: ViewContainerRef) {
    console.log(data);
    const factory = this.componentFactoryResolver.resolveComponentFactory(SelectComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    this.selectComponent.initSelectParams(selectLabel, data, ref);
    // TODO: herausfinden ob der nächste auskommentierte Code nützlich ist.
    // ref.changeDetectorRef.detectChanges();
  }
}