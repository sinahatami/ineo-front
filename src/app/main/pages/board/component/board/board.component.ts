import { Component, OnInit } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ModalOptions } from '../../../../../public/custom-modal/interface/IModalOptions';
import { BoardService } from '../../services/board/board.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBoard } from '../../Interfaces/IBoard';
import { TaskService } from '../../services/task/task.service';
import { ITask } from '../../Interfaces/ITask';
import { UserService } from '../../../users/services/user.service';
import { AlertClass } from '../../../../../public/alert-functions';

@Component({
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {


  drop(event: any) {
    let position = event.currentIndex
    let preBoardId = event.previousContainer.data.id
    this.taskTitle = event.previousContainer.data.tasks[event.previousIndex].title;
    let id: number = event.previousContainer.data.tasks[event.previousIndex].id;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.tasks, event.previousIndex, event.currentIndex)
    }
    else {
      transferArrayItem(
        event.previousContainer.data.tasks,
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex
      )

      const droppedBoard: IBoard = event.container.data;

      this.activeStep = droppedBoard.id

    }
    this.updateTask(id, position, preBoardId)
  }

  updateTask(id: number, position: number, preBoardId: number) {
    this.task = { id: id, boardId: this.activeStep, title: this.taskTitle, position: position, preBoardId: preBoardId } as any
    this.taskService.update(id, this.task).subscribe((res: any) => {
      this.activeStep = null
      this.boardList = res
      this.taskTitle = ''
    })
  }


  showModal: boolean = false
  form: FormGroup

  findTaskOne(id: number) {
    this.form = this.formBuilder.group({
      id: [null],
      title: [null, Validators.required],
      users: [null],
      description: []
    })
    this.taskService.findOne(id).subscribe((res: any) => {
      this.form.patchValue(res)
    })
  }

  getAllUsers() {
    this.userService.findAll().subscribe((res: any) => {
      this.userList = res
    })
  }

  userList: any[] = []

  formType: 'Edit' | 'View'
  taskClicked(task: any) {
    this.showModal = true
    this.formType = "View"
    this.findTaskOne(task.id)
    this.getAllUsers()
  }

  activeStep: number | any
  boardList: IBoard[] = []
  addToCard(id: number | any) {
    this.activeStep = this.boardList.find(b => b.id == id)?.id
  }

  addBoard() {
    this.closeAddBoard()

  }

  modalOptions: ModalOptions = {
    modatTitle: 'show',
    maxWidth: 1000,
    saveCallback: this.save.bind(this),
    hideCallback: this.close.bind(this),
  }

  save() {
    let formValue = this.form.value
    formValue.userIds = this.form.value.users
    this.taskService.update(formValue.id, formValue).subscribe((res: any) => {
      this.close()
      this.boardList = res
      if (this.boardList.length > 0) {
        this.getEachTask()
      }
    })
  }

  close() {
    this.showModal = false
  }

  getAllBoard() {
    this.boardService.findAll().subscribe((res: IBoard[]) => {
      this.boardList = res
      if (this.boardList.length > 0) {
        this.getEachTask()
      }
    })
  }

  getEachTask() {

  }

  BoardName: string
  submitAddBoard() {
    let board: IBoard = { id: 0, name: this.BoardName }
    this.boardService.create(board).subscribe((res: IBoard[]) => {
      this.boardList = res
      this.showAddBoard = true
      this.BoardName = ''
    })
  }

  showAddBoard: boolean = true
  openAddBoard() {
    this.showAddBoard = true
  }

  closeAddBoard() {
    this.activeStep = ''
    this.showAddBoard = false
  }

  taskTitle: string
  task: ITask
  submitAddCard() {
    this.task = { id: 0, boardId: this.activeStep, title: this.taskTitle }
    this.taskService.create(this.task).subscribe((res: any) => {
      this.activeStep = null
      this.boardList = res
      this.taskTitle = ''
    })
  }

  deleteTask(event: Event, task: ITask) {
    event.stopPropagation()
    AlertClass.deleteAlert(_ => this.taskService.remove(task.id).subscribe((res: IBoard[]) => this.boardList = res))
  }

  deleteBoard(event: Event, board: IBoard) {
    event.stopPropagation()
    AlertClass.deleteAlert(_ => this.boardService.remove(board.id).subscribe((res: IBoard[]) => this.boardList = res))
  }

  ngOnInit(): void {
    this.getAllBoard()
  }

  constructor(private boardService: BoardService, private userService: UserService, private taskService: TaskService, private formBuilder: FormBuilder) { }
}