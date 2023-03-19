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

  registerTokenInfoTwo:any;

  sessionUser:any;

  visible:boolean = false

  constructor(private globalservice:GlobalService,private router:Router ,private location:Location) {
    this.getActivatedTokenUser()
  }

  ngOnInit(): void {  
  }



  getActivatedTokenUser(){
    // this.registerToken=this.location.getState()
    // console.log("type of--",this.registerToken,typeof(this.registerToken));
    // if(this.registerToken.tokenuserdata!=undefined){
    //   this.registerTokenInfo=this.registerToken.tokenuserdata.email
    //   console.log("get activate token--",this.registerToken,this.registerTokenInfo);
    //   this.sessionUser=this.registerToken.tokenuserdata
    // }else{
    //   // alert("Not get user--")
    //   console.log("Not get user--");
      
    // }

    this.registerToken= localStorage.getItem("localSession")
    console.log("get local --",this.registerToken);
    
    if(this.registerToken !=undefined){
      console.log("if works");
      const abc=this.registerToken.replace (/(^")|("$)/g, '')

      const data1={
        authentication:abc
      }

      this.globalservice.checkToken(data1).subscribe(res=>{
        this.registerTokenInfoTwo=res
        console.log("get local data",this.registerTokenInfoTwo);
        this.registerTokenInfo=this.registerTokenInfoTwo.authdata.var2[0].email
        console.log("get local storage data",this.registerTokenInfo);
        
      })
      
    }else{
      console.log("else works");
    }
    
  }


  showAddUsers(){
    this.visible = !this.visible
  }

}
