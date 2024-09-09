import { Component, Input, OnInit } from '@angular/core';

import { GridOptions } from 'ag-grid-community'
import { ICustomGridOption } from '../../Interfaces/IGridData';

import { ButtonRendererComponent } from '../renderer/button-renderer/button-renderer.component';
import { HeaderRendererComponent } from '../renderer/header-renderer/header-renderer.component';

import { ColDef } from 'ag-grid-community'

@Component({
  selector: 'custom-ag-grid',
  templateUrl: './custom-ag-grid.component.html',
  styleUrl: './custom-ag-grid.component.scss'
})
export class CustomAgGridComponent implements OnInit {

  @Input() customGridOption: ICustomGridOption


  gridOption = <GridOptions><any>{
    autoSizeStrategy: {
      type: 'fitGridWidth',
    },
    onCellClicked: this.rowClicked.bind(this),
  }

  rowClicked(event: any) {
    event?.column?.colId !== 'actions' && this.customGridOption.rowClicked ? this.customGridOption.rowClicked(event.data.id) : null
  }

  setAction() {
    const actions = this.customGridOption.actions
    let columnDefs = this.gridOption.columnDefs
    if (!columnDefs || !this.gridOption.columnDefs?.filter(a => a.headerName == 'actions')[0])
      this.gridOption.columnDefs?.push({
        headerName: 'actions',
        headerComponentParams: { actions: actions },
        headerComponent: HeaderRendererComponent,
        cellRenderer: ButtonRendererComponent,
        cellRendererParams: { actions: actions },
        filter: false,
        lockPinned: true,
        pinned: 'right',
        colId: 'actions',
        maxWidth: 300,
      })
  }

  setFramework() {
  }

  setHeader() {
    this.gridOption.columnDefs?.map((a: ColDef) => {
      a.headerComponent = HeaderRendererComponent
    })

  }

  ngOnInit(): void {
    this.gridOption.rowData = this.customGridOption.rowData
    this.gridOption.columnDefs = this.customGridOption.columnDefs
    this.setAction()
    this.setFramework()
    this.setHeader()
  }
}
