import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrov2',
  templateUrl: './cadastrov2.component.html',
  styleUrls: ['./cadastrov2.component.css']
})

export class Cadastrov2Component implements OnInit {

  usuario: Usuario = new Usuario
  senhaConfirma: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    environment.token=''
  }

  confirmarSenha(event: any) {
    this.senhaConfirma = event.target.value
  }

  cadastrar() {
    if (this.usuario.senha != this.senhaConfirma){
      alert('As senhas estão incorretas')
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) =>{
        this.usuario = resp
        this.router.navigate(['/login'])
        alert('Usuário cadastrado com sucesso!')
      }) 
    }

  }

}

