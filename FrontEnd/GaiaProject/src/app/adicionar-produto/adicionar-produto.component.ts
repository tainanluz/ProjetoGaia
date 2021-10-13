import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categorias } from '../model/Categorias';
import { Produtos } from '../model/Produtos';
import { Usuario } from '../model/Usuario';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent implements OnInit {
  listaProdutos: Produtos[]
  categorias: Categorias = new Categorias()
  idCategoria: number
  idProduto: number
  usuario: Usuario = new Usuario()
  produtos: Produtos = new Produtos()

  constructor(
    private router: Router,
    private produtoService: ProdutosService
   ) { }
 
   ngOnInit(){
   if (environment.token == ''){
   this.router.navigate(['/login'])
 }
  this.findAllProduto()
 } 
 

 findAllProduto(){
  this.produtoService.getAllProduto().subscribe((resp: Produtos[])=> {
    this.listaProdutos = resp
  })
  }


 findByIdProduto() {
   this.produtoService.getByIdProduto(this.idProduto).subscribe((resp: Produtos) => {
     this.produtos = resp
   })
 }

 AdicionarProduto(){
    this.categorias.idCategoria = this.idCategoria
    this.usuario.idUsuario = environment.idUsuario
    this.categorias.usuario = this.usuario
    console.log("produto "+JSON.stringify(this.produtos))
    this.produtoService.postProduto(this.produtos).subscribe((resp: Produtos) => {
    this.produtos = resp
    alert('Produto adicionado com sucesso')
    })
  }
}