import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { MarksGraphComponent } from './marks-graph.component';


@NgModule({
    declarations: [
        MarksGraphComponent
    ],
    imports: [
      BrowserModule,
      RouterModule,
      ChartsModule
    ],
    exports: [
        MarksGraphComponent
    ],
    providers: [],
  })
  export class UtilModule { }