import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.put<UsuarioLogin>('https://gaiaecommerce.herokuapp.com/Usuario/Credenciais', usuarioLogin)
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('https://gaiaecommerce.herokuapp.com/Usuario/Salvar', usuario)
  }
}
