import {NgModule, ViewContainerRef} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { CheckboxComponent } from './elements/checkbox/checkbox.component';
import { TextfieldComponent} from './elements/textfield/textfield.component';
import { TestComponent } from './test/test.component';
import { SelectComponent } from './elements/select/select.component';
import { ButtonComponent } from './elements/button/button.component';
import { TableComponent } from './elements/table/table.component';
import { DynamicButtonComponent} from './dynamic-elements/dynamic-button/dynamic-button.component';
import { TestTableComponent} from './test/test-table';

import { DynamicCheckboxComponent } from './dynamic-elements/dynamic-checkbox/dynamic-checkbox.component';
import { DynamicTableComponent } from './dynamic-elements/dynamic-table/dynamic-table.component';
import { DynamicTextfieldComponent } from './dynamic-elements/dynamic-textfield/dynamic-textfield.component';
import { DynamicSelectComponent } from './dynamic-elements/dynamic-select/dynamic-select.component';

import { FileService } from './services/file.service';


@NgModule({
  entryComponents: [
    CheckboxComponent,
    ButtonComponent,
    TableComponent,
    TextfieldComponent,
    SelectComponent
  ],
  declarations: [
    AppComponent,
    TestComponent,
    TestTableComponent,
    CheckboxComponent,
    TextfieldComponent,
    SelectComponent,
    ButtonComponent,
    TableComponent,
    DynamicButtonComponent,
    DynamicCheckboxComponent,
    DynamicTableComponent,
    DynamicTextfieldComponent,
    DynamicSelectComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    FileService,
    ButtonComponent,
    CheckboxComponent,
    TableComponent,
    TextfieldComponent,
    SelectComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
