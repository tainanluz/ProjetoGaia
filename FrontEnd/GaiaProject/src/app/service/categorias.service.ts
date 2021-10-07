import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categorias } from '../model/Categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllCategoria(): Observable<Categorias[]>{
    return this.http.get<Categorias[]>('http://deploygaia.herokuapp.com/Categorias/PegarTodos', this.token)
  }

  getByIdCategoria(id: number): Observable<Categorias>{
    return this.http.get<Categorias>(`https://bloggeneration29.herokuapp.com/Categorias/${id}`, this.token)
  }

  postCategoria(categorias: Categorias): Observable<Categorias>{
    return this.http.post<Categorias>('http://deploygaia.herokuapp.com/Categorias/Salvar', categorias, this.token)
  }

  putCategoria(categorias: Categorias): Observable<Categorias>{
    return this.http.put<Categorias>('https://bloggeneration29.herokuapp.com/Categorias',categorias, this.token)
  }

  deleteCategoria(id: number) {
    return this.http.delete(`https://bloggeneration29.herokuapp.com/Categorias/${id}`,this.token)
  }
  }