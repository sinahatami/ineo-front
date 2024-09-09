import { ColDef } from 'ag-grid-community'
import { IAction } from './IAction'

export interface ICustomGridOption {
    rowData: any[] | null
    columnDefs: ColDef[]

    actions?: IAction[]

    rowClicked?: Function
}