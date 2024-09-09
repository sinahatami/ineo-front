import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAction } from '../../../Interfaces/IAction';

@Component({
  selector: 'button-renderer',
  templateUrl: './button-renderer.component.html',
  styleUrl: './button-renderer.component.scss'
})
export class ButtonRendererComponent implements ICellRendererAngularComp {

  params: any
  agInit(params: any) {
    this.params = params
    this.actions = params.actions
    this.showAction()
  }

  editAction: IAction
  deleteAction: IAction
  actions: IAction[] = []
  showAction() {
    this.editAction = this.actions.filter(a => a.label == "Edit")[0]
    this.deleteAction = this.actions.filter(a => a.label == "Delete")[0]
  }

  onClick(action: IAction) { action.callback(this.params.node.data.id) }

  refresh() { return true }

}
