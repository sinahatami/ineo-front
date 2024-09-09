import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../../../../environments/environment';
import { ITask } from '../../Interfaces/ITask';
import { IBoard } from '../../Interfaces/IBoard';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  readonly subUrl: string = environment.API_URL
  readonly controlerName: string = 'tasks'

  url: string = `${this.subUrl}/${this.controlerName}`

  create(user: ITask): Observable<ITask[]> { return this.http.post<ITask[]>(this.url, user) }

  findOne(id: number) { return this.http.get<ITask>(`${this.url}/${id}`) }

  update(id: number, user: ITask): Observable<IBoard[]> { return this.http.put<IBoard[]>(`${this.url}/${id}`, user) }

  remove(id: number) { return this.http.delete<IBoard[]>(`${this.url}/${id}`) }

  constructor(private http: HttpClient) { }
}
