import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";
import {AuthRepositoryService} from "../services/auth.repository.service";
import {LoaderService} from "../services/loader.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public actions =[
    {title : "Home" , route : "/home" , icon : "house"},
    {title : "Products" , route : "/products" , icon : "list"},
    {title : "New Product" , route : "/newProduct" , icon : "database-add"}
  ];
  public loading =this.loaderService.isLoading$;
  public currentAction : any ="";
  constructor(
    public appState:AppStateService,
    private authService:AuthRepositoryService,
    private loaderService : LoaderService,
    private router : Router) {
  }


  ngOnInit() {
    this.currentAction = location.pathname;
    console.log(location.pathname)
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/login")
  }

  handleLogin() {
    this.router.navigateByUrl("/login")
  }
}
