import { LoginComponent } from './login/login.component'
import { Routes, RouterModule } from '@angular/router'
import { LogoutComponent } from './logout/logout.component'
// import { LogoutComponent } from './logout/logout.component'
// import { AuthCallbackComponent } from './auth-callback/auth-callback.component'
// import { SilentRefreshComponent } from './silent-refresh/silent-refresh.component'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  //{ path: 'login/:type', component: LoginComponent },
  // { path: 'auth-callback', component: AuthCallbackComponent },
  // { path: 'auth-callback/:code/:scope/:state/:session_state', component: AuthCallbackComponent },
  // { path: 'silent-refresh', component: SilentRefreshComponent }
]

export const AuthRouting = RouterModule.forChild(routes)
