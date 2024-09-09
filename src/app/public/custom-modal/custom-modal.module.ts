import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomModalComponent } from './component/custom-modal.component'

import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  imports: [
    CommonModule,
    NgxSmartModalModule.forChild(),
    MatButtonModule
  ],
  declarations: [
    CustomModalComponent
  ],
  providers: [
    NgxSmartModalService
  ],
  exports: [
    CustomModalComponent
  ]
})
export class CustomModalModule { }
