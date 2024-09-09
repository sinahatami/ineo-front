import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
  { path: '', component: UsersComponent },
]

export const usersRouting = RouterModule.forChild(routes)
