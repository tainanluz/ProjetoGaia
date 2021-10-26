import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categorias } from '../model/Categorias';
import { ItemCarrinho } from '../model/ItemCarrinho';
import { Produtos } from '../model/Produtos';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CarrinhoService } from '../service/carrinho.service';
import { CategoriasService } from '../service/categorias.service';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-search-produto',
  templateUrl: './search-produto.component.html',
  styleUrls: ['./search-produto.component.css']
})
export class SearchProdutoComponent implements OnInit {

  listaProdutos: Produtos[]
  listaCategorias: Categorias[]
  categorias: Categorias = new Categorias()
  idCategoria: number
  idProduto: number
  usuario: Usuario = new Usuario()
  produtos: Produtos = new Produtos()
  isLogged = false;
  itemCarrinho: ItemCarrinho;
  nomeProduto: string;
  nomeCategoria: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private categoriaService: CategoriasService,
    private produtosService: ProdutosService,
    private carrinhoService: CarrinhoService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    if (localStorage.getItem('token') == '') {
      this.router.navigate(['/loginv2'])
    }
    this.isLogged = this.authService.isLogged();
    this.findAllCategorias();
    this.findAllProduto();
  }


  findAllCategorias() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categorias[]) => {
      this.listaCategorias = resp
    })
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

  findByNomeProduto(){
    if(this.nomeProduto==''){
    this.findAllProduto();
    }
    {
      this.produtosService.getByNomeProduto(this.nomeProduto).subscribe((resp: Produtos[])=>{
        this.listaProdutos=resp;
    });
  }
  }

  findByCategoria(){
    if(this.nomeCategoria==''){
      this.findAllCategorias()
    }{
      this.categoriaService.getByNomeCategoria(this.nomeCategoria).subscribe((resp: Categorias[])=>{
        this.listaCategorias;
        console.log(this.listaCategorias);
       });
    }
}

}
