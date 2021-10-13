import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/model/Categorias';
import { Produtos } from 'src/app/model/Produtos';
import { CategoriasService } from 'src/app/service/categorias.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {

  produto: Produtos = new Produtos()
  categoria: Categorias = new Categorias()
  idCategoria: number
  listaCategorias: Categorias[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtoService: ProdutosService,
    private categoriaService: CategoriasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if (environment.token == '') {
      this.router.navigate(['/login'])
    }
    let id = this.route.snapshot.params['id']
    this.findByIdProdutos(id)
    this.findAllCategorias()
  }

  findByIdProdutos(id: number) {
    this.produtoService.getByIdPostagem(id).subscribe((resp: Produtos) => {
      this.produto = resp
    })
  }

  findByIdCategoria() {
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categorias) =>{
      this.categoria = resp
    })
  }

  findAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categorias[]) =>{
      this.listaCategorias = resp
    })
  }

  atualizar() {
    this.categoria.idCategoria = this.idCategoria
    this.produto.categorias = this.categoria

    this.produtoService.putProdutos(this.produto).subscribe((resp: Produtos) =>{
      this.produto = resp
      alert('Produto atualizado com sucesso!')
      this.router.navigate(['/home'])
    })
  }

}
