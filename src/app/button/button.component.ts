import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ViewContainerRef, ComponentFactory, ComponentFactoryResolver} from '@angular/core';


@Component({
  selector: 'app-button',
  template: `
    <button #buttonContainer type="button">
      {{buttontext}}
    </button>`,
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  // Variablendeklaration für den Buttontext, der im Template benutzt wird.
  @Input() buttontext = '';
  // ComponentFactory für die Klasse ButtonComponent.
  buttonFactory: ComponentFactory<ButtonComponent>;

  constructor(private resolver: ComponentFactoryResolver) {
    /* Mit der Klasse ComponentFactoryResolver, habe ich die Möglichkeit, über buttonFactory Zugriff auf das Template von ButtonComponent
    zu bekommen. */
    this.buttonFactory = this.resolver.resolveComponentFactory(ButtonComponent);
  }

  // addButton erwartet einen Buttontext und ein ViewContainerRef-Objekt
  public addButton(buttontext: string, container: ViewContainerRef) {
    /* Das ViewContainerRef-Objekt ist ein Objekt, dass die Referenzierung auf ein bestimmtes Childelement beinhaltet.
       Also an die Stelle, an die in diesem Fall der Button erzeugt werden soll.
       Mit createComponent erzeuge ich das Button-Element*/
    const buttonRef = container.createComponent(this.buttonFactory);
    // mit "instance" übergebe ich mein Input an das Element.
    buttonRef.instance.buttontext = buttontext;
  }


  ngOnInit() {

  }

}
