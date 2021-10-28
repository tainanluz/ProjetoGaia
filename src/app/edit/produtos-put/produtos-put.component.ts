import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/model/Categorias';
import { Produtos } from 'src/app/model/Produtos';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { CategoriasService } from 'src/app/service/categorias.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

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
  isLogged = false;

  constructor(
    private authService: AuthService,
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') == '') {
      this.router.navigate(['/loginv2'])
    }
    this.isLogged = this.authService.isLogged();

    let id = this.route.snapshot.params['id']
    this.findByIdCategoria(id)
    this.findAllCategorias()
    this.findAllProduto()
  }

  findAllProduto() {
    this.produtosService.getAllProduto().subscribe((resp: Produtos[]) => {
      this.listaProdutos = resp
    })
  }

  findAllCategorias() {
    this.categoriasService.getAllCategoria().subscribe((resp: Categorias[]) => {
      this.listaCategorias = resp
    })
  }

  findByIdCategoria(id: number) {
    this.produtosService.getByIdProduto(id).subscribe((resp: Produtos) => {
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

  

  atualizar() {
    this.categorias.idCategoria = this.idCategoria
    this.usuario.idUsuario = environment.idUsuario
    this.produtos.categoriaRelacionada = this.categorias
    console.log("produto " + JSON.stringify(this.produtos))
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ms-2',
        cancelButton: 'btn btn-danger me-2'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Você tem certeza?',
      text: "Você realmente deseja atualizar este produto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, Atualize!',
      cancelButtonText: 'Não, cancele!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtosService.putProduto(this.produtos).subscribe((resp: Produtos) => {
          this.produtos = resp
          // alert('Categoria atualizada com sucesso!')
          window.location.reload();
          this.router.navigate(['adicionarCategoria'])
        })
        swalWithBootstrapButtons.fire(
          'Atualizado!',
          'O produto foi atualizado.',
          'success'
        )
        this.router.navigate(['/adicionarCategoria'])
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'O produto está seguro',
          'error'
        )
        this.router.navigate(['/adicionarCategoria'])
      }
    })
    this.findAllProduto();
  }
}