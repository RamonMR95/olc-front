import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { MarksGraphComponent } from './marks-graph/marks-graph.component';
import { UploadComponent } from './upload/upload.component';
import { MaterialModule } from '../material.module';


@NgModule({
    declarations: [
        MarksGraphComponent,
        UploadComponent
    ],
    imports: [
      BrowserModule,
      RouterModule,
      ChartsModule,
      MaterialModule
    ],
    exports: [
        MarksGraphComponent,
        UploadComponent
    ],
    providers: [],
  })
  export class UtilModule { }