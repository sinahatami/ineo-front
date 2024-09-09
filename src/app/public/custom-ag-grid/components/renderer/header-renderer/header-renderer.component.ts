import { Component, ElementRef, ViewChild } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { IAction } from '../../../Interfaces/IAction';
import { IHeaderAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'header-renderer',
  templateUrl: './header-renderer.component.html',
  styleUrl: './header-renderer.component.scss'
})
export class HeaderRendererComponent implements IHeaderAngularComp {

  addAction: IAction
  setButtons() {
    this.addAction = this.actions.filter(a => a.label == "Add")[0]
  }

  params: any
  actions: IAction[] = []
  agInit(params: any): void {
    this.params = params
    this.actions = this.params?.column?.colDef?.cellRendererParams?.actions
    this.actions ? this.setButtons() : null

    params.column.addEventListener('sortChanged', this.onSortChanged.bind(this))
    this.onSortChanged()
  }

  onAddClick(item: any, $event: any) {
    const params = {
      event: $event,
      rowData: []
    }
    item.callback(params)
  }

  hover: boolean = false
  @ViewChild('menuButton', { read: ElementRef, static: false }) public menuButton: ElementRef
  mouseleave() {
    let e = document.getElementsByClassName('ag-popup-child')[0]
    if (!e) this.hover = false
  }

  onMenuClicked(event: any) {
    this.params.showColumnMenu(this.menuButton.nativeElement);
  }

  sort: string = '';
  _sortingUp: boolean = false;
  _sortingDown: boolean = false;
  _sorting: boolean = true;
  onSortRequested(order: any, event: any) {
    if (this.params && (this.params.column.colId == 'View' || this.params.column.colId == 'Edit' || this.params.column.colId == 'Add' || this.params.column.colId == 'Delete')) return

    if (order == '') {
      this._sortingUp = true;
      this._sortingDown = false;
      this._sorting = false;
      order = 'asc';
      this.sort = 'asc';
    }
    else if (order == 'asc') {
      this._sortingUp = false;
      this._sortingDown = true;
      this._sorting = false;
      order = 'desc';
      this.sort = 'desc';
    }
    else if (order == 'desc') {
      this._sortingUp = false;
      this._sortingDown = false;
      this._sorting = true;
      order = '';
      this.sort = '';
    }
    this.params.setSort(order, event.shiftKey);
  }

  ascSort: string
  descSort: string
  noSort: string
  onSortChanged() {
    this.ascSort = this.descSort = this.noSort = 'inactive';
    if (this.params.column.isSortAscending()) {
      this.ascSort = 'active';
    } else if (this.params.column.isSortDescending()) {
      this.descSort = 'active';
    } else {
      this.noSort = 'active';
    }
  }

  refresh() { return true }

}
