import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categorias } from '../model/Categorias';
import { Produtos } from '../model/Produtos';
import { Usuario } from '../model/Usuario';
import { CategoriasService } from '../service/categorias.service';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listaCategorias: Categorias[]
  categorias: Categorias = new Categorias
  idCategoria: number
  idProduto: number
  usuario: Usuario = new Usuario()
  produtos: Produtos = new Produtos()
  listaProdutos: Produtos[]
  
  constructor(
   private router: Router,
   private categoriaService: CategoriasService,
   private produtosService: ProdutosService,

   ) {
    
   }

  ngOnInit(){
  if (localStorage.getItem('token') == '')
  { 
   this.router.navigate(['/login'])
  }
  this.findAllCategorias()
  this.findAllProduto()
} 
 

 findAllCategorias(){
  this.categoriaService.getAllCategoria().subscribe((resp: Categorias[])=> {
    this.listaCategorias = resp
  })
  }

 AdicionarCategoria(){
    this.produtos.idProduto = this.idProduto
    this.usuario.idUsuario = environment.idUsuario
    this.categorias.usuario = this.usuario
    console.log("produto "+JSON.stringify(this.categorias))
    this.categoriaService.postCategoria(this.categorias).subscribe((resp: Categorias) => {
    this.categorias = resp
    alert('Categoria adicionada com sucesso')
    })
  }

findByIdCategoria() {
  this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categorias) => {
    this.categorias = resp
  })
}
findAllProduto(){
  this.produtosService.getAllProduto().subscribe((resp: Produtos[])=> {
    this.listaProdutos = resp
  })
  }

}

