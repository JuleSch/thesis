import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { Checkbox, CheckboxComponent } from './checkbox/checkbox.component';
import { Textfield, TextfieldComponent} from './textfield/textfield.component';
import { TestComponent } from './test/test.component';

import { JsonService} from './json.service';
import { Selectbox, SelectComponent } from './select/select.component';

@NgModule({
  entryComponents: [
    Textfield,
    Checkbox,
    Selectbox
  ],
  declarations: [
    AppComponent,
    CheckboxComponent,
    Checkbox,
    TextfieldComponent,
    Textfield,
    TestComponent,
    SelectComponent,
    Selectbox
  ],

  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [JsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
