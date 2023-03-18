import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/service/global.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerToken:any;
  registerTokenInfo:any="User Not Found";

  constructor(private globalservice:GlobalService,private router:Router ,private location:Location) {
    this.getActivatedTokenUser()
  }

  ngOnInit(): void {
  }

  getActivatedTokenUser(){
    this.registerToken=this.location.getState()
    console.log("type of--",this.registerToken,typeof(this.registerToken));
    if(this.registerToken.tokenuserdata!=undefined){
      this.registerTokenInfo=this.registerToken.tokenuserdata.email
      console.log("get activate token--",this.registerToken,this.registerTokenInfo);
    }else{
      alert("Not get user--")
    }
    
    
  }

}
