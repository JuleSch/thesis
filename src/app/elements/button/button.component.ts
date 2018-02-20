import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-button',
  template: `
    <button #buttonContainer type="button">
      {{buttontext}}
    </button>`,
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  // Variablendeklaration für den Buttontext, der im Template benutzt wird.
  @Input() buttontext = '';

  // initButtonParams erwartet einen Buttontext und ein viewContainerRef-Objekt
    initButtonParams(buttontext: string, ref: any) {
    // mit "instance" übergebe ich mein Input an das Element.
    ref.instance.buttontext = buttontext;
  }


}
