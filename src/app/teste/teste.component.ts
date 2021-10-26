import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';
import { CarrinhoService } from '../service/carrinho.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  template: `<input
    type="checkbox"
    [checked]="darkMode$ | async"
    (change)="onToggle()"
  />`,
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  isDark:boolean = false

  constructor(
    private darkModeService: DarkModeService,
    private carrinhoService: CarrinhoService,
  ) { }

  ngOnInit(): void {
    
  }

  onToggle(): void {
    this.darkModeService.toggle();
    this.getDarkMode();
    console.log(this.isDark);
  }
  getDarkMode(): boolean {
    return this.isDark = this.carrinhoService.getDarkMode();
   }
}
