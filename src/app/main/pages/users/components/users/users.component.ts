import { Component, OnInit } from '@angular/core';

import { ICustomGridOption } from '../../../../../public/custom-ag-grid/Interfaces/IGridData'

import { UserService } from '../../services/user.service';
import { ModalOptions } from '../../../../../public/custom-modal/interface/IModalOptions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../Interfaces/IUser';
import { IForm } from '../../../../../public/IForm';
import { AlertClass } from '../../../../../public/alert-functions';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  gridOption = <ICustomGridOption><any>{
    actions: [
      {
        label: 'Edit',
        callback: this.edit.bind(this)
      },
      {
        label: 'Delete',
        callback: this.delete.bind(this)
      },
      {
        label: 'Add',
        callback: this.add.bind(this)
      }
    ],
    rowClicked: this.rowClicked.bind(this)
  }

  delete(id: number) {
    AlertClass.deleteAlert(_ => {
      this.hideGrid()
      this.userService.remove(id).subscribe((res: any) => {
        this.gridOption.rowData = res
        this.showGrid()
      })
    })
  }

  showModal: boolean = false
  modalOptions: ModalOptions = {
    modatTitle: 'User',
    maxWidth: 700,
    saveCallback: this.save.bind(this),
    hideCallback: this.close.bind(this),
  }

  formType: string = "Add" || "Edit" || "View"

  create(formValue: IUser) {
    this.hideGrid()
    let formValueCopy: any = formValue
    delete formValueCopy.repeatPassword
    this.userService.create(formValue).subscribe((res: IUser[]) => {
      this.gridOption.rowData = res
      this.close()
      this.showGrid()
    })
  }

  checkValidation(): boolean {
    if (this.form.valid)
      return true
    else return false
  }

  update(formValue: IUser) {
    this.hideGrid()
    let formValueCopy: any = formValue
    delete formValueCopy.repeatPassword
    if (this.checkValidation())
      this.userService.update(formValue.id, formValue).subscribe((res: IUser[]) => {
        this.gridOption.rowData = res
        this.close()
        this.showGrid()
      })
  }

  save() {
    let formValue: IUser = this.form.getRawValue()
    this.formType == "Add" ? this.create(formValue) : this.update(formValue)
  }

  close() {
    this.showModal = false
    this.modalOptions.modalType = ""
    this.enableForm()
  }

  openModal() {
    this.form.reset()
    this.showModal = true
  }

  edit(id: number) {
    this.openModal()
    this.formType = "Edit"
    this.getOne(id)
    this.modalOptions.modalType = "Edit"
  }

  add(event: any) {
    this.modalOptions.modalType = "Add"
    this.openModal()
    this.formType = "Add"
  }

  disableForm() {
    this.form.disable()
  }

  enableForm() {
    this.form.enable()
  }

  rowClicked(id: any) {
    this.modalOptions.modalType = "View"
    this.openModal()
    this.formType = "View"
    this.disableForm()
    this.getOne(id)
  }

  getAll() {
    this.hideGrid()
    this.userService.findAll().subscribe((res: IUser[]) => {
      this.gridOption.rowData = res
      this.showGrid()
    })
  }

  getOne(id: number) {
    this.userService.findOne(id).subscribe((res: IUser) => {
      this.form.patchValue(res)
    })
  }

  setForm() {
    var form: IForm<IUser> = {
      id: [null],
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      isAdmin: [false],
    }
    this.formBuilder.group(form)
    this.form = this.formBuilder.group(form)
  }

  setColumns() {
    this.gridOption.columnDefs = [
      { field: "id" },
      { field: "username" }
    ]
  }

  form: FormGroup
  repeatPassword: string
  ngOnInit(): void {
    this.setColumns()
    this.setForm()
    this.getAll()
  }

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  showHideGrid: boolean = false
  showGrid() {
    this.showHideGrid = true
  }

  hideGrid() {
    this.showHideGrid = false
  }

}
