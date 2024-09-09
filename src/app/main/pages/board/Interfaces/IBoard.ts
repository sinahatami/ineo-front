import { ITask } from "./ITask"

export interface IBoard {
    id: number
    name: string
    tasks?: ITask[]
    position?: number
}