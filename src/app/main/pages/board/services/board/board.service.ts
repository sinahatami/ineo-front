import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

import { Observable } from 'rxjs';
import { IBoard } from '../../Interfaces/IBoard';

@Injectable()
export class BoardService {

  readonly subUrl: string = environment.API_URL
  readonly controlerName: string = 'boards'

  url: string = `${this.subUrl}/${this.controlerName}`

  findAll(): Observable<IBoard[]> { return this.http.get<IBoard[]>(this.url) }

  create(user: IBoard): Observable<IBoard[]> { return this.http.post<IBoard[]>(this.url, user) }

  remove(id: number): Observable<IBoard[]> { return this.http.delete<IBoard[]>(`${this.url}/${id}`) }

  constructor(private http: HttpClient) { }
}
