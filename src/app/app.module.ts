import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { DynamicCheckbox, CheckboxComponent } from './checkbox/checkbox.component';
import { DynamicTextfield, TextfieldComponent} from './textfield/textfield.component';
import { TestComponent } from './test/test.component';

import { DynamicSelectbox, SelectComponent } from './select/select.component';
import {  ButtonComponent } from './button/button.component';
import {  TableComponent } from './table/table.component';

import { FileService } from './services/file.service';

@NgModule({
  entryComponents: [
    DynamicTextfield,
    DynamicCheckbox,
    DynamicSelectbox,
    ButtonComponent,
    TableComponent
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
    TableComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    FileService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
