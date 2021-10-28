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
  selector: 'app-categoria-put',
  templateUrl: './categoria-put.component.html',
  styleUrls: ['./categoria-put.component.css']
})
export class CategoriaPutComponent implements OnInit {

  listaProdutos: Produtos[]
  listaCategorias: Categorias[]
  categorias: Categorias = new Categorias()
  idCategoria: number
  idProduto: number
  usuario: Usuario = new Usuario()
  produtos: Produtos = new Produtos()
  isLogged = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private produtosService: ProdutosService,
    private categoriaService: CategoriasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') == '') {
      this.router.navigate(['/loginv2'])
    }
    this.isLogged = this.authService.isLogged();

    let id = this.route.snapshot.params['id']
    this.findByIdCategoria(id)
  }

  findByIdCategoria(id: number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categorias)=>{
      this.categorias = resp
    })
  }

  atualizar(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ms-2',
        cancelButton: 'btn btn-danger me-2'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Você tem certeza?',
      text: "Você realmente deseja atualizar esta categoria?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, Atualize!',
      cancelButtonText: 'Não, cancele!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.putCategoria(this.categorias).subscribe((resp: Categorias)=>{this.categorias=resp
          // alert('Categoria atualizada com sucesso!')
          window.location.reload();
        this.router.navigate(['adicionarCategoria'])
        })
        swalWithBootstrapButtons.fire(
          'Atualizada!',
          'A categoria foi atualizada.',
          'success'
        )
        this.router.navigate(['/adicionarCategoria'])
      }else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'A categoria está segura',
          'error'
        )
        this.router.navigate(['/adicionarCategoria'])
      }
    })
  
  }

}