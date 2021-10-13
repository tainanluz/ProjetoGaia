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

  getAllProdutos(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>('https://deploygaia.herokuapp.com/Produtos/PegarTodos', this.token)
  }

  getByIdPostagem(id: number): Observable<Produtos> {
    return this.http.get<Produtos>(`https://deploygaia.herokuapp.com/Produtos/Busca/ID/${id}`, this.token)
  }

  postProdutos(produto: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>('https://deploygaia.herokuapp.com/Produtos/Salvar', this.token)
  }

  putProdutos(produto: Produtos): Observable<Produtos>{
    return this.http.put<Produtos>('https://deploygaia.herokuapp.com/Produtos/Atualiza/', produto, this.token)

  }

  deleteProdutos(id: number) {
    return this.http.delete(`https://deploygaia.herokuapp.com/Produtos/DELETE/ID/${id}`, this.token)
  }
}
