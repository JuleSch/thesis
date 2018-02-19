import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ViewContainerRef, ComponentFactory, ComponentFactoryResolver} from '@angular/core';


@Component({
  selector: 'app-checkbox',
  template: `<div #checkceck>
    <label>{{checkboxLabel}}<input type="checkbox"></label>
    </div>`,
  styleUrls: ['./checkbox.component.css']
})

export class CheckboxComponent implements OnInit {
  @Input() checkboxLabel = '';

  // @ViewChild --> Verbindung zum selector; ViewcontainerRef, denifiert es als ViewContainer
  // @ViewChild('checkboxContainer', {read: ViewContainerRef}) checkboxContainer;
  checkboxFactory: ComponentFactory<CheckboxComponent>;
  constructor(private resolver: ComponentFactoryResolver){
    this.checkboxFactory = this.resolver.resolveComponentFactory(CheckboxComponent);
  }

  addCheckbox(checkboxLabel: string, container: ViewContainerRef) {
    const checkboxRef = container.createComponent(this.checkboxFactory); // mit createComponent erzeuge ich das Element
    checkboxRef.instance.checkboxLabel = checkboxLabel;

  }

  ngOnInit() {

  }

}
