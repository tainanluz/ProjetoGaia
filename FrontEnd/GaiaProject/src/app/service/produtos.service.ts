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

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllProduto(): Observable<Produtos[]>{
    return this.http.get<Produtos[]>('http://deploygaia.herokuapp.com/Produtos/PegarTodos', this.token)
  }

  getByIdProduto(id: number): Observable<Produtos>{
    return this.http.get<Produtos>(`http://deploygaia.herokuapp.com/Produtos/Busca/ID/${id}`, this.token)
  }

  postProduto(produtos: Produtos): Observable<Produtos>{
    return this.http.post<Produtos>('http://deploygaia.herokuapp.com/Produtos/Salvar', produtos, this.token)
  }

  putProduto(produtos: Produtos): Observable<Produtos>{
    return this.http.put<Produtos>('http://deploygaia.herokuapp.com/Produtos/Atualiza',produtos, this.token)
  }

  deleteProduto(id: number) {
    return this.http.delete(`http://deploygaia.herokuapp.com/Produtos/DELETE/ID/${id}`,this.token)
  }
  }