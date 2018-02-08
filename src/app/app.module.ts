import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { Checkbox, CheckboxComponent } from './checkbox/checkbox.component';
import { Textfield, TextfieldComponent} from './textfield/textfield.component';
import { TestComponent } from './test/test.component';

import { JsonService} from './json.service';
import { Selectbox, SelectComponent } from './select/select.component';
import { DynamicButton, ButtonComponent } from './button/button.component';

@NgModule({
  entryComponents: [
    Textfield,
    Checkbox,
    Selectbox,
    DynamicButton
  ],
  declarations: [
    AppComponent,
    CheckboxComponent,
    Checkbox,
    TextfieldComponent,
    Textfield,
    TestComponent,
    SelectComponent,
    Selectbox,
    ButtonComponent,
    DynamicButton
  ],

  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [JsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
