import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { mainRouting } from './main.routing';
import { MainComponent } from './main/main.component';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    mainRouting,
    MatCardModule
  ],
  declarations: [
    MainComponent
  ],
})
export class MainModule { }
