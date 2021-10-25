import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';

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

  constructor(
    private darkModeService: DarkModeService
  ) { }

  ngOnInit(): void {
  }

  onToggle(): void {
    this.darkModeService.toggle();
  }

}
