import {Component, ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
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

  createCheckbox(checkBoxLabel: string, active: boolean) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(CheckboxComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    this.checkboxComponent.initCheckboxParams(checkBoxLabel, active, ref);
    // TODO: herausfinden ob der nächste auskommentierte Code nützlich ist.
    // ref.changeDetectorRef.detectChanges();
  }

}
