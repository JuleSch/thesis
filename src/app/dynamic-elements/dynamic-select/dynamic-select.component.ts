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

  createSelect(data: any, label: string, defaultValue: string) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(SelectComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    this.selectComponent.initSelectParams(data, label, defaultValue, ref);
    // TODO: herausfinden ob der nächste auskommentierte Code nützlich ist.
    // ref.changeDetectorRef.detectChanges();
  }
}
