import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/model/Categorias';
import { Produtos } from 'src/app/model/Produtos';
import { Usuario } from 'src/app/model/Usuario';
import { CategoriasService } from 'src/app/service/categorias.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-categoria-put',
  templateUrl: './categoria-put.component.html',
  styleUrls: ['./categoria-put.component.css']
})
export class CategoriaPutComponent implements OnInit {

  listaCategorias: Categorias[]
  categorias: Categorias = new Categorias()
  idCategoria: number
  idProduto: number
  usuario: Usuario = new Usuario()
  produtos: Produtos = new Produtos()

  constructor(
    private categoriaService: CategoriasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(environment.token =='')
    this.router.navigate(['/entrar'])
    let id = this.route.snapshot.params['id']
    this.findByIdCategoria(id)
  }

  findByIdCategoria(id: number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categorias)=>{
      this.categorias = resp
    })
  }

  atualizar(){
    this.categoriaService.putCategoria(this.categorias).subscribe((resp: Categorias)=>{this.categorias=resp
    alert('Categoria atualizada com sucesso!')
    this.router.navigate(['adicionarCategoria'])
    })
  }

}