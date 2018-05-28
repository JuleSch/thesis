import {Component, ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {TextfieldComponent} from '../../elements/textfield/textfield.component';

@Component({
  selector: 'app-dynamic-textfield',
  templateUrl: './dynamic-textfield.component.html',
  styleUrls: ['./dynamic-textfield.component.css']
})

@Injectable()
export class DynamicTextfieldComponent {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private textfieldComponent: TextfieldComponent) {
  }

  createTextfield(type: string, label: string, readonly?: boolean, formData?: any, valueName?: string, ) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(TextfieldComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    this.textfieldComponent.initTextfieldParams(type, label, formData, valueName, readonly, ref);
    // TODO: herausfinden ob der nächste auskommentierte Code nützlich ist.
    // ref.changeDetectorRef.detectChanges();
  }
}
