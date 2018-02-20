import {NgModule, ViewContainerRef} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CheckboxComponent } from './elements/checkbox/checkbox.component';
import { DynamicTextfield, TextfieldComponent} from './elements/textfield/textfield.component';
import { TestComponent } from './test/test.component';
import { DynamicSelectbox, SelectComponent } from './elements/select/select.component';
import {  ButtonComponent } from './elements/button/button.component';
import {  TableComponent } from './elements/table/table.component';
import { DynamicButtonComponent} from './dynamic-elements/dynamic-button/dynamic-button.component';

import{ FileService } from './services/file.service';
import { DynamicCheckboxComponent } from './dynamic-elements/dynamic-checkbox/dynamic-checkbox.component';
import { DynamicTableComponent } from './dynamic-elements/dynamic-table/dynamic-table.component';

@NgModule({
  entryComponents: [
    DynamicTextfield,
    DynamicSelectbox,
    CheckboxComponent,
    ButtonComponent,
    TableComponent,
  ],
  declarations: [
    AppComponent,
    CheckboxComponent,
    TextfieldComponent,
    DynamicTextfield,
    TestComponent,
    SelectComponent,
    DynamicSelectbox,
    ButtonComponent,
    TableComponent,
    DynamicButtonComponent,
    DynamicCheckboxComponent,
    DynamicTableComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    FileService,
    ButtonComponent,
    CheckboxComponent,
    TableComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
