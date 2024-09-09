import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

import { Observable } from 'rxjs';
import { IUser } from '../Interfaces/IUser';

@Injectable()
export class UserService {

  readonly subUrl: string = environment.API_URL
  readonly controlerName: string = 'users'

  readonly url: string = `${this.subUrl}/${this.controlerName}`

  findAll(): Observable<IUser[]> { return this.http.get<IUser[]>(this.url) }

  findOne(id: number) { return this.http.get<IUser>(`${this.url}/${id}`) }

  create(user: IUser): Observable<IUser[]> { return this.http.post<IUser[]>(this.url, user) }

  update(id: number, user: IUser): Observable<IUser[]> { return this.http.put<IUser[]>(`${this.url}/${id}`, user) }

  remove(id: number) { return this.http.delete<IUser[]>(`${this.url}/${id}`) }

  constructor(private http: HttpClient) { }
}
