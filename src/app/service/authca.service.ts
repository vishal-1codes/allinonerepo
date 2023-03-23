import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthcaService implements OnInit{
  loggedIn:boolean=false;

  constructor() { }

  ngOnInit(): void {
    
  }

  login(){
    this.loggedIn=true;
  }

  logout(){
    this.loggedIn=false;
  }

  isAuthenticated(){
    return  this.loggedIn;
  }

}
