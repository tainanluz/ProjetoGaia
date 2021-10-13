import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  usuario: Usuario = new Usuario()
  
  idCategoria: number
  categorias: Categorias = new Categorias
  listaCategorias: Categorias[]
  
  idProduto: number
  produto: Produtos = new Produtos()
  listaProdutos: Produtos[]


  constructor(
    private http: HttpClient,
    private router: Router,
    private categoriaService: CategoriasService,
    private produtoService: ProdutosService

  ) {

  }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/login'])
    }
    this.getAllCategorias()
    this.getAllProdutos()
  }

  getAllProdutos() {
    this.produtoService.getAllProdutos().subscribe ((resp: Produtos[]) =>{
      this.listaProdutos = resp
    })
  }

  publicar() {
    this.categorias.idCategoria = this.idCategoria
    this.produto.categorias = this.categorias

    this.produtoService.postProdutos(this.produto).subscribe((resp: Produtos) =>{
      this.produto = resp 
      alert('Produto cadastrado com sucesso!')
      this.produto = new Produtos()
      this.getAllProdutos()
    })
  }

  getAllCategorias() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categorias[]) => {
      this.listaCategorias = resp
    })
  }

  AdicionarCategoria() {
    this.produto.idProduto = this.idProduto
    this.usuario.idUsuario = environment.idUsuario
    this.categorias.usuario = this.usuario
    console.log("produto " + JSON.stringify(this.categorias))
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
}

