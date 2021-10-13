import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/model/Categorias';
import { Produtos } from 'src/app/model/Produtos';
import { CategoriasService } from 'src/app/service/categorias.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {
  
  produto: Produtos = new Produtos()
  idProduto: number
  listaProdutos: Produtos[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtoService: ProdutosService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if (environment.token == '') {
      this.router.navigate(['/login'])
    }
    this.idProduto = this.route.snapshot.params['id']
    this.findByIdProdutos(this.idProduto)
  }

  findByIdProdutos(idProduto: number) {
    this.produtoService.getByIdPostagem(idProduto).subscribe((resp: Produtos) => {
      this.produto = resp
    })
  }

  apagar() {
    this.produtoService.deleteProdutos(this.idProduto).subscribe(()=>{
      alert('Produto apagado com sucesso!')
      this.router.navigate(['/home'])
    })
  }

}
