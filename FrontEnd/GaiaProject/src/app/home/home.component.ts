import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categorias } from '../model/Categorias';
import { CategoriasService } from '../service/categorias.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listaCategorias: Categorias[]
  categorias: Categorias = new Categorias
  idCategoria: number


  constructor(
   private router: Router,
   private categoriaService: CategoriasService
  ) { }

  ngOnInit(){
  if (environment.token == ''){
  this.router.navigate([])
}
} 

findByIdCategoria() {
  this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categorias) => {
    this.categorias = resp
  })
}
}
