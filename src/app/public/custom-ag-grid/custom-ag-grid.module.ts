import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridAngular } from 'ag-grid-angular'
import { CustomAgGridComponent } from './components/body/custom-ag-grid.component';
import { ButtonRendererComponent } from './components/renderer/button-renderer/button-renderer.component';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip'


import { HeaderRendererComponent } from './components/renderer/header-renderer/header-renderer.component'

@NgModule({
  imports: [
    CommonModule,
    AgGridAngular,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule
  ],
  declarations: [
    CustomAgGridComponent,
    ButtonRendererComponent,
    HeaderRendererComponent
  ],
  exports: [
    CustomAgGridComponent
  ]
})
export class CustomAgGridModule { }
