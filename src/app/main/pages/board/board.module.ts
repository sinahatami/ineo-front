import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRouting } from './board.routing';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardComponent } from './component/board/board.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CustomModalModule } from '../../../public/custom-modal/custom-modal.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BoardService } from './services/board/board.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskService } from './services/task/task.service';
import { UserService } from '../users/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    BoardRouting,
    DragDropModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CustomModalModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule
  ],
  declarations: [
    BoardComponent,
  ],
  providers: [BoardService, TaskService, UserService]
})
export class BoardModule { }
