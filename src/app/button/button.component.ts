import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ViewContainerRef, ComponentFactory, ComponentFactoryResolver} from '@angular/core';


@Component({
  selector: 'dynamicButton',
  template: `
    <div>
      <button type="button">{{buttontext}}</button>
    </div>`
})
export class DynamicButton {
  @Input() buttontext: string;
}


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  // @ViewChild --> Verbindung zum selector; ViewcontainerRef, denifiert es als ViewContainer
  @ViewChild('buttonContainer', {read: ViewContainerRef}) buttonContainer;
  buttonFactory: ComponentFactory<DynamicButton>;
  constructor(private resolver: ComponentFactoryResolver) {
    this.buttonFactory = this.resolver.resolveComponentFactory(DynamicButton);
  }

  addButton(buttontext: string) {
    const buttonRef = this.buttonContainer.createComponent(this.buttonFactory); // mit createComponent erzeuge ich das Element
    buttonRef.instance.buttontext = buttontext;

  }

  ngOnInit(){
    this.addButton('Klick mich!');
    // this.container.remove(this.container.length - 1); --> löscht die letzte Checkbox
    // mit der Methode "detach" kann man die Komponente erstmal aus dem DOM entfernen, aber zu einem späteren zeitpunkt mit der insert-Methode wieder einfügen.

  }

}
