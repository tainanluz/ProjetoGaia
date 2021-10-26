import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/model/Categorias';
import { Produtos } from 'src/app/model/Produtos';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produtos-delete',
  templateUrl: './produtos-delete.component.html',
  styleUrls: ['./produtos-delete.component.css']
})
export class ProdutosDeleteComponent implements OnInit {
  listaProdutos: Produtos[]
  categorias: Categorias = new Categorias()
  idCategoria: number
  idProduto: number
  usuario: Usuario = new Usuario()
  produtos: Produtos = new Produtos()
  isLogged = false;

  constructor(
    private authService: AuthService,
    private produtosService: ProdutosService,
    private router: Router,
    private route: ActivatedRoute

  ) { }  ngOnInit() {
    if (localStorage.getItem('token') == '') {
      this.router.navigate(['/loginv2'])
    }
    this.isLogged = this.authService.isLogged();

    this.idProduto = this.route.snapshot.params['id']
    this.findByIdCategoria(this.idProduto)
    }

    findByIdCategoria(id: number)
    {
      this.produtosService.getByIdProduto(id).subscribe((resp: Produtos)=>{
        this.produtos=resp
      })
    }

    apagar(){
      this.produtosService.deleteProduto(this.idProduto).subscribe(()=>{ console.log("Produto: "+JSON.stringify(this.produtos))
        alert('Produto apagado com sucesso!')
        this.router.navigate(['/adicionarCategoria'])
      })
    }

}