import { LoginComponent } from './login/login.component'
import { Routes, RouterModule } from '@angular/router'
import { LogoutComponent } from './logout/logout.component'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
]

export const AuthRouting = RouterModule.forChild(routes)
