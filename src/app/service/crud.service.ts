import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService implements OnInit{

  access:boolean=false;

  constructor() { }

  ngOnInit(): void {
    
  }

  itHr(){
    this.access=true;
  }

  itNotHr(){
    this.access=false;
  }

  HR(){
    return  this.access;
  }



}
