import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { LabelComponent, TextfieldComponent} from './textfield/textfield.component';
import { TestComponent } from './test/test.component';

import { JsonService} from './json.service';

@NgModule({
  entryComponents: [LabelComponent],
  declarations: [
    AppComponent,
    CheckboxComponent,
    TextfieldComponent,
    LabelComponent,
    TestComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [JsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
