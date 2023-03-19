import { Component, ViewEncapsulation,OnInit } from '@angular/core';
import { GlobalService } from 'src/app/service/global.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None

})
export class AppComponent implements OnInit{
  title = 'allinone';

  localStoragePorN:any;
  checkTokenData:any;
  checkTokenDataPorN:any;

  constructor(private globalservice:GlobalService,private router:Router){
   setTimeout(()=>{
    this.checkLocalStorage()
    console.log("after 5 sec app ");
    
   },5000)
  }

  ngOnInit(): void {
    
  }

  checkLocalStorage(){
    console.log("checking local storage==");
    this.localStoragePorN=localStorage.getItem("localSession")

    if(this.localStoragePorN != undefined){
      console.log("local storage present==",this.localStoragePorN);
      this.checkTokenPorN()
    }else{
      console.log("local storage not present==");
    }
  }

  checkTokenPorN(){
    console.log("check token data is present or not==");
    let abc=this.localStoragePorN.replace (/(^")|("$)/g, '')
    console.log("get",abc);
    
    const datah2={
      authentication:abc
    }
    console.log("check register datah2==",datah2);
    
    this.globalservice.checkToken(datah2).subscribe(res=>{
      console.log("get token response==",res);
      this.checkTokenData=res
      console.log("check checkTokenData==",this.checkTokenData);

      if(this.checkTokenData.result=="Invalid Token, Token expire"){
        // alert("Invalid Token, Token expire==")
        console.log("Invalid Token, Token expire==");
        localStorage.clear();
        
      }else{
        console.log("user data is present==");
        this.checkTokenDataPorN=this.checkTokenData.authdata.var2[0]
        console.log("check token data==",this.checkTokenDataPorN);
        this.router.navigateByUrl("/home",{state:{tokenuserdata:this.checkTokenDataPorN}})
      }

      
      
    })



  }

}
