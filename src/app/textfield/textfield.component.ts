import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ViewContainerRef, ComponentFactory, ComponentFactoryResolver} from '@angular/core';


@Component({
  selector: 'textfield',
  template: `<div><label>{{label}}<input></label></div>`
})
export class Textfield {
  @Input() label = 'Label';
}


@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css']
})

export class TextfieldComponent implements OnInit {

  @ViewChild('container', {read: ViewContainerRef}) container; // @ViewChild --> Verbindung zum selector; ViewcontainerRef, denifiert es als ViewContainer
  textfieldFactory: ComponentFactory<Textfield>;
  constructor(private resolver: ComponentFactoryResolver){
    this.textfieldFactory = this.resolver.resolveComponentFactory(Textfield);
  }


  addTextfield(label: string){
    const textfieldRef = this.container.createComponent(this.textfieldFactory); // mit createComponent erzeuge ist das Element
    textfieldRef.instance.label = label;
  }

  ngOnInit(){
    this.addTextfield('neues Label');
    // this.container.remove(this.container.length - 1); --> löscht das letzte Textfeld
    // mit der Mtehode "detach" kann man die Komponente erstmal aus dem DOM entfernen, aber zu einem späteren zeitpunkt mit der insert-Methode wieder einfügen.

  }

}


