import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/model/Categorias';
import { Produtos } from 'src/app/model/Produtos';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { CategoriasService } from 'src/app/service/categorias.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  listaCategorias: Categorias[]
  categorias: Categorias = new Categorias()
  idCategoria: number
  idProduto: number
  usuario: Usuario = new Usuario()
  produtos: Produtos = new Produtos()
  isLogged = false;

  constructor(
    private authService: AuthService,
    private categoriaService: CategoriasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') == '') {
      this.router.navigate(['/loginv2'])
    }
    this.isLogged = this.authService.isLogged();

    this.idCategoria = this.route.snapshot.params['id']
    this.findByIdCategoria(this.idCategoria)
  }

  findByIdCategoria(id: number) {
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categorias) => {
      this.categorias = resp
    })
  }



  apagar() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ms-2',
        cancelButton: 'btn btn-danger me-2'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Você tem certeza?',
      text: "Não será possivel reverter!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apague!',
      cancelButtonText: 'Não, cancele!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.deleteCategoria(this.idCategoria).subscribe(() => {
          console.log("Categoria: " + JSON.stringify(this.categorias))
          window.location.reload();
          // alert('Tema apagado com sucesso!')
         
        })
        swalWithBootstrapButtons.fire(
          'Deletada!',
          'A categoria foi deletado.',
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