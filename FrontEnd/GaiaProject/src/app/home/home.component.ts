import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categorias } from '../model/Categorias';
import { ItemCarrinho } from '../model/ItemCarrinho';
import { Produtos } from '../model/Produtos';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CarrinhoService } from '../service/carrinho.service';
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
  itemCarrinho: ItemCarrinho
  isLogged = false;
  listaCarrinho: ItemCarrinho[];
  isDark:boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private categoriaService: CategoriasService,
    private produtosService: ProdutosService,
    private carrinhoService: CarrinhoService   

  ) {

  }

  ngOnInit() {
    if (localStorage.getItem('token') == '') {
      this.router.navigate(['/loginv2'])
    }
    this.isLogged = this.authService.isLogged();
    this.findAllCategorias()
    this.findAllProduto()
    // this.findAllCarrinho()
  }

  findAllCarrinho() {
    this.listaCarrinho = this.carrinhoService.getAllCarrinho();
  }


  findAllCategorias() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categorias[]) => {
      this.listaCategorias = resp
    })
  }


  AdicionarCategoria() {
    this.produtos.idProduto = this.idProduto
    this.usuario.idUsuario = environment.idUsuario
    this.categorias.usuario = this.usuario
    console.log("produto " + JSON.stringify(this.categorias))
    this.categoriaService.postCategoria(this.categorias).subscribe((resp: Categorias) => {
      this.categorias = resp
      alert('Categoria adicionada com sucesso')
    })
  }

  getDarkMode(): boolean {
    return this.isDark = this.carrinhoService.getDarkMode();
   }

  findByIdCategoria() {
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categorias) => {
      this.categorias = resp
    })
  }
  findAllProduto() {
    this.produtosService.getAllProduto().subscribe((resp: Produtos[]) => {
      this.listaProdutos = resp
    })
  }
  adicionarCarrinho(produtos: Produtos, quantidade:number):void{
    this.itemCarrinho={produtos, quantidade}
    this.carrinhoService.adicionarItem(this.itemCarrinho)
  }

  // removerProduto(productId:number,quantidade:number):void{
  //   this.itemCarrinho={productId, quantidade}
  //   this.carrinhoService.removerItem(this.itemCarrinho)
  // }
}

