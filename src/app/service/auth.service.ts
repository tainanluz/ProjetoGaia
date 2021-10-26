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
    private http: HttpClient,
  ) { }

  login(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.put<UsuarioLogin>('https://deploygaia.herokuapp.com/Usuario/credenciais', usuarioLogin)
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('https://deploygaia.herokuapp.com/Usuario/salvar', usuario)
  }

  logout():void{
    localStorage.removeItem('token');
  }

  isLogged():boolean{
    const token=localStorage.getItem('token');
    if(token){
      return true;
    }
    return false;
  }

}


