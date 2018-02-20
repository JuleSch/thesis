import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ViewContainerRef, ComponentFactory, ComponentFactoryResolver} from '@angular/core';

//TODO: herausfinden warum Syntax mit "!" und nicht mit {{}}
@Component({
  selector: 'dynamic-textfield',
  template: `<div><label>{{label}}<input [readonly]="!readonly"></label></div>`
})
export class DynamicTextfield {
  @Input() label = 'Label';
  @Input() readonly: boolean;
}


@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css']
})

export class TextfieldComponent implements OnInit {


  @ViewChild('textfieldContainer', {read: ViewContainerRef}) textfieldContainer; // @ViewChild --> Verbindung zum selector; ViewcontainerRef, denifiert es als ViewContainer
  textfieldFactory: ComponentFactory<DynamicTextfield>;
  constructor(private resolver: ComponentFactoryResolver){
    this.textfieldFactory = this.resolver.resolveComponentFactory(DynamicTextfield);
  }


  addTextfield(label: string, readonly: boolean){
    const textfieldRef = this.textfieldContainer.createComponent(this.textfieldFactory); // mit createComponent erzeuge ist das Element
    textfieldRef.instance.label = label;
    textfieldRef.instance.readonly = readonly;
  }

  ngOnInit(){
   // this.addTextfield('neues Label', true);
    // this.container.remove(this.container.length - 1); --> löscht das letzte Textfeld
    // mit der Mtehode "detach" kann man die Komponente erstmal aus dem DOM entfernen, aber zu einem späteren zeitpunkt mit der insert-Methode wieder einfügen.

  }

}


