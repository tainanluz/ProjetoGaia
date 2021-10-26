import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Produtos } from '../model/Produtos';
import { CategoriasService } from '../service/categorias.service';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  idProduto: number
  produtos: Produtos = new Produtos()
  listaProdutos: Produtos[]

  constructor(
    private router: Router,
    private produtosService: ProdutosService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.findByIdProduto(urlParams.id);
      console.log(urlParams.id);
    });
  }

  findByIdProduto(id: number) {
    this.produtosService.getByIdProduto(id).subscribe((resp: Produtos) => {
      this.produtos = resp
      console.log(resp);
    })
  }
}
