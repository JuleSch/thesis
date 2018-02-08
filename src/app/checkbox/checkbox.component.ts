import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ViewContainerRef, ComponentFactory, ComponentFactoryResolver} from '@angular/core';


@Component({
  selector: 'dynamic-checkbox',
  template: `
    <div><label>{{checkboxLabel}}<input type="checkbox"></label></div>`
})
export class DynamicCheckbox {
  @Input() checkboxLabel = '';
}


@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  // @ViewChild --> Verbindung zum selector; ViewcontainerRef, denifiert es als ViewContainer
  @ViewChild('checkboxContainer', {read: ViewContainerRef}) checkboxContainer;
  checkboxFactory: ComponentFactory<DynamicCheckbox>;
  constructor(private resolver: ComponentFactoryResolver){
    this.checkboxFactory = this.resolver.resolveComponentFactory(DynamicCheckbox);
  }

  addCheckbox(checkboxLabel: string) {
    const checkboxRef = this.checkboxContainer.createComponent(this.checkboxFactory); // mit createComponent erzeuge ich das Element
    checkboxRef.instance.checkboxLabel = checkboxLabel;

  }

  ngOnInit(){
    this.addCheckbox('Hier eine Checkbox');
    // this.container.remove(this.container.length - 1); --> löscht die letzte Checkbox
    // mit der Methode "detach" kann man die Komponente erstmal aus dem DOM entfernen, aber zu einem späteren zeitpunkt mit der insert-Methode wieder einfügen.

  }

}
