import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { usersRouting } from './users.routing'

import { UsersComponent } from './components/users/users.component'
import { CustomAgGridModule } from '../../../public/custom-ag-grid/custom-ag-grid.module'

import { UserService } from './services/user.service'
import { CustomModalModule } from '../../../public/custom-modal/custom-modal.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  imports: [
    CommonModule,
    usersRouting,
    CustomAgGridModule,
    CustomModalModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  declarations: [
    UsersComponent
  ],
  providers: [
    UserService
  ]
})
export class UsersModule { }
