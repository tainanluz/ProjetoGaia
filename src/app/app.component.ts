import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template: `
    <h1>angular-dark-mode</h1>
    <p>Toggle to see magic happens!</p>
    <app-dark-mode-toggle></app-dark-mode-toggle>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public auth: AuthService
  ){}
  title = 'GaiaProject';
}
