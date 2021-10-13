import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/model/Categorias';
import { Produtos } from 'src/app/model/Produtos';
import { Usuario } from 'src/app/model/Usuario';
import { ProdutosService } from 'src/app/service/produtos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produtos-put',
  templateUrl: './produtos-put.component.html',
  styleUrls: ['./produtos-put.component.css']
})
export class ProdutosPutComponent implements OnInit {

  listaProdutos: Produtos[]
  categorias: Categorias = new Categorias()
  idCategoria: number
  idProduto: number
  usuario: Usuario = new Usuario()
  produtos: Produtos = new Produtos()

  constructor(
    private produtosService: ProdutosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(environment.token =='')
    this.router.navigate(['/entrar'])
    let id = this.route.snapshot.params['id']
    this.findByIdCategoria(id)
  }

  findByIdCategoria(id: number){
    this.produtosService.getByIdProduto(id).subscribe((resp: Produtos)=>{
      this.produtos = resp
    })
  }

  atualizar(){
    this.produtosService.putProduto(this.produtos).subscribe((resp: Produtos)=>{this.produtos=resp
    alert('Produto atualizado com sucesso!')
    console.log("Produto:"+JSON.stringify(this.produtos))
    this.router.navigate(['adicionarCategoria'])
    })
  }

}