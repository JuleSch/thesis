import {Component, EventEmitter, Output} from '@angular/core';



@Component({
  selector: 'app-json-button',
  template: `<div class="fixed-top">
    <button class="btn btn-dark" (click)="onJsonClick()"><i class="fab fa-js"></i></button>
  </div>`
})

export class JsonButtonComponent {

  @Output() jsonClick: EventEmitter<any> = new EventEmitter<any>();

  onJsonClick() {
    console.log('in getJsonData in TestButton');
    this.jsonClick.emit();
  }

  showAlert(input: any) {
    console.log('in showAlert-Methode');
    alert(JSON.stringify(input));

  }

}


