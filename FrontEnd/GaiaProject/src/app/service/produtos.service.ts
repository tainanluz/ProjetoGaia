import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produtos } from '../model/Produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {


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

  getAllProduto(): Observable<Produtos[]>{
    return this.http.get<Produtos[]>('https://deploygaia.herokuapp.com/Produtos/PegarTodos', this.token)
  }

  getByIdProduto(id: number): Observable<Produtos>{
    return this.http.get<Produtos>(`https://deploygaia.herokuapp.com/Produtos/Busca/ID/${id}`, this.token)
  }

  postProduto(produtos: Produtos): Observable<Produtos>{
    return this.http.post<Produtos>('https://deploygaia.herokuapp.com/Produtos/Salvar', produtos, this.token)
  }

  putProduto(produtos: Produtos): Observable<Produtos>{
    return this.http.put<Produtos>('https://deploygaia.herokuapp.com/Produtos/Atualiza',produtos, this.token)
  }

  deleteProduto(id: number) {
    return this.http.delete(`https://deploygaia.herokuapp.com/Produtos/DELETE/ID/${id}`,this.token)
  }
  }