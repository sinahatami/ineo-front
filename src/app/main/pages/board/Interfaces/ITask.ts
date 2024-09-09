import { IUser } from "../../users/Interfaces/IUser";

export interface ITask {
    id: number
    title: string
    description?: string
    status?: string
    users?: IUser[]
    boardId: number
    position?: number
}