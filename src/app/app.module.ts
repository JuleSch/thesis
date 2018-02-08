import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { Ng2SmartTableModule} from 'ng2-smart-table';

import { AppComponent } from './app.component';
import { DynamicCheckbox, CheckboxComponent } from './checkbox/checkbox.component';
import { DynamicTextfield, TextfieldComponent} from './textfield/textfield.component';
import { TestComponent } from './test/test.component';

import { JsonService} from './services/json.service';
import { DynamicSelectbox, SelectComponent } from './select/select.component';
import { DynamicButton, ButtonComponent } from './button/button.component';
import { DynamicTable, TableComponent } from './table/table.component';

@NgModule({
  entryComponents: [
    DynamicTextfield,
    DynamicCheckbox,
    DynamicSelectbox,
    DynamicButton,
    DynamicTable
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
    DynamicTable
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    Ng2SmartTableModule
  ],
  providers: [JsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
