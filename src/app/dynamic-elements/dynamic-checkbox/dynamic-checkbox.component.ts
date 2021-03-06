import {Component, ComponentFactoryResolver, EventEmitter, Output, ViewContainerRef} from '@angular/core';
import {CheckboxComponent} from '../../elements/checkbox/checkbox.component';

@Component({
  selector: 'app-dynamic-checkbox',
  templateUrl: './dynamic-checkbox.component.html',
  styleUrls: ['./dynamic-checkbox.component.css']
})

export class DynamicCheckboxComponent {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private checkboxComponent: CheckboxComponent) {
  }


  createCheckbox(checkBoxLabel: string, formData: any, valueName: string) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(CheckboxComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    this.checkboxComponent.initCheckboxParams(checkBoxLabel, formData, valueName, ref);
        // TODO: herausfinden ob der nächste auskommentierte Code nützlich ist.
        // ref.changeDetectorRef.detectChanges();
  }
}
