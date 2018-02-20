import {Component, ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {ButtonComponent} from '../../elements/button/button.component';


@Component({
  selector: 'app-dynamic-button',
  template: `
    <button (click)="buttonKlick()">Ich erzeuge multiple Buttons</button>
  `
})

// TODO: @Injectable() definiert die Klasse als Service. Herausfinden, ob ich @Component davon trennen sollte.
// TODO: Sollten Services immer ein return in einer Methode haben?
// TODO: Sollte ich die Klasse zu service umbenennen?
@Injectable()
export class DynamicButtonComponent {

  // TODO: Herausfinden, warum ich die Objekte der Klassen nicht auch außerhalb definieren kann.
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private buttonComponent: ButtonComponent) {
  }

  createButton(viewContainerRef: ViewContainerRef, buttonText: string) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ButtonComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    this.buttonComponent.initButtonParams(buttonText, ref);
    // TODO: herausfinden ob der nächste auskommentierte Code nützlich ist.
    // ref.changeDetectorRef.detectChanges();
  }

  buttonKlick() {
    this.createButton(this.viewContainerRef, 'Ich bin neu');
  }


}


