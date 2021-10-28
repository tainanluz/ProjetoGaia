import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemCarrinho } from '../model/ItemCarrinho';
import { Produtos } from '../model/Produtos';
import { AuthService } from '../service/auth.service';
import { CarrinhoService } from '../service/carrinho.service';
import { CategoriasService } from '../service/categorias.service';
import { ProdutosService } from '../service/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  idProduto: number
  produtos: Produtos = new Produtos()
  listaProdutos: Produtos[]
  itemCarrinho: ItemCarrinho
  listaCarrinho: ItemCarrinho[];

  constructor(
    private router: Router,
    private produtosService: ProdutosService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private categoriaService: CategoriasService,
    private carrinhoService: CarrinhoService   
  ) { }

  ngOnInit(): void {
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.findByIdProduto(urlParams.id);
      console.log(urlParams.id);
      this.findAllProduto();
    });
  }

  findAllProduto() {
    this.produtosService.getAllProduto().subscribe((resp: Produtos[]) => {
      this.listaProdutos = resp
    })
  }

  findAllCarrinho() {
    this.listaCarrinho = this.carrinhoService.getAllCarrinho();
  }

  adicionarCarrinho(produtos: Produtos, quantidade: number): void {
    this.itemCarrinho = { produtos, quantidade }
    this.carrinhoService.adicionarItem(this.itemCarrinho)

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Produto adicionado'
    })
  }

  findByIdProduto(id: number) {
    this.produtosService.getByIdProduto(id).subscribe((resp: Produtos) => {
      this.produtos = resp
      console.log(resp);
    })
  }
}
