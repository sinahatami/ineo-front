import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'

import { AuthRouting } from './auth.routing'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { LogoutComponent } from './logout/logout.component'


const MATERIALS = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
]

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthRouting,
    FormsModule,
    ReactiveFormsModule,
    MATERIALS
  ],
  providers: [ToastrService]
})
export class AuthModule { }
