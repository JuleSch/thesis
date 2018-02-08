import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { DynamicCheckbox, CheckboxComponent } from './checkbox/checkbox.component';
import { DynamicTextfield, TextfieldComponent} from './textfield/textfield.component';
import { TestComponent } from './test/test.component';

import { JsonService} from './json.service';
import { DynamicSelectbox, SelectComponent } from './select/select.component';
import { DynamicButton, ButtonComponent } from './button/button.component';

@NgModule({
  entryComponents: [
    DynamicTextfield,
    DynamicCheckbox,
    DynamicSelectbox,
    DynamicButton
  ],
  declarations: [
    AppComponent,
    CheckboxComponent,
    DynamicCheckbox,
    TextfieldComponent,
    DynamicTextfield,
    TestComponent,
    SelectComponent,
    DynamicSelectbox,
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
