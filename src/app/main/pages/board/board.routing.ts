import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './component/board/board.component';


export const routes: Routes = [
  { path: '', component: BoardComponent },
]

export const BoardRouting = RouterModule.forChild(routes)
