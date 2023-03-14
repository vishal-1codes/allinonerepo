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
  registerTokenInfo:any;

  constructor(private globalservice:GlobalService,private router:Router ,private location:Location) {
    this.getActivatedToken()
  }

  ngOnInit(): void {
  }

  getActivatedToken(){
    this.registerToken=this.location.getState()
    this.registerTokenInfo=this.registerToken.token.authdata.val.email
    console.log("get activate token",this.registerToken,this.registerTokenInfo);
    
  }

}
