import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardRouting } from './dashboard.routing'

import { DashboardComponent } from './components/dashboard.component'


@NgModule({
  imports: [
    CommonModule,
    DashboardRouting
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
