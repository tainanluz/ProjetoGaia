import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged=false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(){
    this.isLogged=this.authService.isLogged();
  }

logout():void{
this.authService.logout()
}

}

