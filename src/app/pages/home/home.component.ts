import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/service/global.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthcaService } from 'src/app/service/authca.service';
import { CrudService } from 'src/app/service/crud.service';

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

  checkHrOrNot:any;

  

  constructor(private globalservice:GlobalService,private router:Router ,private location:Location,private authcas:AuthcaService,
    private crudservice:CrudService) {
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
        this.checkHrOrNot=this.registerTokenInfoTwo.authdata.var2[0].status
        console.log("check hr or not",this.checkHrOrNot);
       

        
        this.registerTokenInfo=this.registerTokenInfoTwo.authdata.var2[0].email
        console.log("get local storage data",this.registerTokenInfo);
        
      })
      
    }else{
      console.log("else works");
    }
    
  }


  


  goBack(){
    console.log("backbutton work");
    this.router.navigateByUrl("/login")
  }

  logout(){
    console.log("log out user, remove local storage");
    localStorage.clear()
    this.authcas.logout()
    this.router.navigateByUrl("/login")

    
  }


  goToList(){
    console.log("get active user");

    if(this.checkHrOrNot=="1"){
      console.log("it is HR do crud");
      this.crudservice.itHr()
      this.router.navigateByUrl("/listusers")
    }else{
      console.log("it is Software developer not access to crud");
      this.crudservice.itNotHr()
      alert("Only Hr have crud access")
    }

    
  }

}
