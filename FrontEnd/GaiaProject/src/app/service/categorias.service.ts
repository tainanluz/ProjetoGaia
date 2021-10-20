import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorias } from '../model/Categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }
  tokenLocalStorage = localStorage.getItem('token');
  

  token = {
    headers: new HttpHeaders().set('Authorization', this.getToken())
  }

  getToken(): string {
    if (this.tokenLocalStorage) {
      return this.tokenLocalStorage;
    } 
    return '';
  }

  getAllCategoria(): Observable<Categorias[]>{
    return this.http.get<Categorias[]>('https://deploygaia.herokuapp.com/Categorias/PegarTodos', this.token)
  }

  getByIdCategoria(id: number): Observable<Categorias>{
    return this.http.get<Categorias>(`https://deploygaia.herokuapp.com/Categorias/Busca/ID/${id}`, this.token)
  }

  postCategoria(categorias: Categorias): Observable<Categorias>{
    return this.http.post<Categorias>('https://deploygaia.herokuapp.com/Categorias/Salvar', categorias, this.token)
  }

  putCategoria(categorias: Categorias): Observable<Categorias>{
    return this.http.put<Categorias>('https://deploygaia.herokuapp.com/Categorias/Atualiza',categorias, this.token)
  }

  deleteCategoria(id: number) {
    return this.http.delete(`https://deploygaia.herokuapp.com/Categorias/DELETE/ID/${id}`,this.token)
  }
  }