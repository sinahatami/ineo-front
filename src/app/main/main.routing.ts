// import { MainComponent } from './main-body/body/main.component'
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuardService } from '../auth/providers/guard/auth.guard';
// import { AuthGuardService } from '../auth/providers/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'board', loadChildren: () => import('./pages/board/board.module').then(m => m.BoardModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuardService]
      }
    ]
  }
]

export const mainRouting = RouterModule.forChild(routes)
