import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { Ng2SmartTableModule} from 'ng2-smart-table';

import { AppComponent } from './app.component';
import { DynamicCheckbox, CheckboxComponent } from './checkbox/checkbox.component';
import { DynamicTextfield, TextfieldComponent} from './textfield/textfield.component';
import { TestComponent } from './test/test.component';

import { DynamicSelectbox, SelectComponent } from './select/select.component';
import { DynamicButton, ButtonComponent } from './button/button.component';
import { DynamicTableHeader, DynamicTableData, TableComponent } from './table/table.component';

import { FileService } from './services/file.service';

@NgModule({
  entryComponents: [
    DynamicTextfield,
    DynamicCheckbox,
    DynamicSelectbox,
    DynamicButton,
    DynamicTableHeader,
    DynamicTableData
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
    DynamicButton,
    TableComponent,
    DynamicTableHeader,
    DynamicTableData
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    Ng2SmartTableModule
  ],
  providers: [
    FileService,
    TableComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
