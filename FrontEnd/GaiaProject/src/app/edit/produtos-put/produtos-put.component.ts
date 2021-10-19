import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/model/Categorias';
import { Produtos } from 'src/app/model/Produtos';
import { Usuario } from 'src/app/model/Usuario';
import { CategoriasService } from 'src/app/service/categorias.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produtos-put',
  templateUrl: './produtos-put.component.html',
  styleUrls: ['./produtos-put.component.css']
})
export class ProdutosPutComponent implements OnInit {
  listaCategorias: Categorias[]
  listaProdutos: Produtos[]
  categorias: Categorias = new Categorias()
  idCategoria: number
  idProduto: number
  usuario: Usuario = new Usuario()
  produtos: Produtos = new Produtos()

  constructor(
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(environment.token =='')
    this.router.navigate(['/entrar'])
    let id = this.route.snapshot.params['id']
    this.findByIdCategoria(id)
    this.findAllCategorias()
    this.findAllProduto()
  }

  findAllProduto(){
    this.produtosService.getAllProduto().subscribe((resp: Produtos[])=> {
      this.listaProdutos = resp
    })
    }

  findAllCategorias(){
    this.categoriasService.getAllCategoria().subscribe((resp: Categorias[])=> {
      this.listaCategorias = resp
    })
    }

  findByIdCategoria(id: number){
    this.produtosService.getByIdProduto(id).subscribe((resp: Produtos)=>{
      this.produtos = resp
    })
  }

  findByIdCategoriaSelect() {
    this.categoriasService.getByIdCategoria(this.idCategoria).subscribe((resp: Categorias) => {
      this.categorias = resp
    })
  }

  // atualizar(){
  //   this.produtosService.putProduto(this.produtos).subscribe((resp: Produtos)=>{this.produtos=resp
  //   alert('Produto atualizado com sucesso!')
  //   console.log("Produto:"+JSON.stringify(this.produtos))
  //   this.router.navigate(['adicionarCategoria'])
  //   })
  // }
  
  atualizar(){
    this.categorias.idCategoria = this.idCategoria
    this.usuario.idUsuario = environment.idUsuario

    this.produtos.categoriaRelacionada = this.categorias
    console.log("produto "+JSON.stringify(this.produtos))
    this.produtosService.putProduto(this.produtos).subscribe((resp: Produtos) => {
    this.produtos = resp
    alert('Produto adicionado com sucesso')
    })
  }
}