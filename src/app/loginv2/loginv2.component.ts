import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './loginv2.component.html',
  styleUrls: ['./loginv2.component.css']
})
export class Loginv2Component implements OnInit {
  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  login() {
    this.auth.login(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp

      environment.token = this.usuarioLogin.token
      localStorage.setItem('token',this.usuarioLogin.token);
      environment.nome = this.usuarioLogin.nome
      environment.idUsuario = this.usuarioLogin.idUsuario


      this.router.navigate(['/home'])
    }, erro=> {
      if(erro.status == 400) {
        alert('Usuário ou senha estão incorretos!')
      }
    })
  }

}
