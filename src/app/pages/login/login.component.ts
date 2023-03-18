import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/service/global.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerUser:any;
  registerUserEmail:any="";
  registerUserPassword:any="";

  storeLoginToken:any;
  storeLoginTokenT:any;

  getTokenUser:any;
  getTokenUserData:any


  constructor(private globalservice:GlobalService,private router:Router ,private location:Location) { }

  ngOnInit(): void {
    this.getNewUserInfo()
  }


  getNewUserInfo(){
    this.registerUser=this.location.getState()
    console.log("get new register user data----",this.registerUser);
    this.registerUserEmail=this.registerUser.newuser.email
    this.registerUserPassword=this.registerUser.newuser.password
    console.log("get new user emial and password----",this.registerUserEmail,this.registerUserPassword);
    
  }


  loginSubmit(){
    console.log("click loginSubmit email password----",this.registerUserEmail,this.registerUserPassword);
    this.checkUserPresentOrNot()
  }

  checkUserPresentOrNot(){
    console.log("checkUserPresentOrNot call----",this.registerUserEmail,this.registerUserPassword);
    const data={
      email:this.registerUserEmail,
      password:this.registerUserPassword
    }
    this.globalservice.checkLoginUser(data).subscribe(res=>{
      console.log("get login token----",res);
      this.storeLoginToken=res
      this.storeLoginTokenT=this.storeLoginToken.token
      console.log("get token into storeLoginToken----",this.storeLoginTokenT);

      if(this.storeLoginTokenT!=undefined){
        console.log("token is present----");
        const data2={
          authentication:this.storeLoginTokenT
        }
        this.globalservice.checkToken(data2).subscribe(res=>{
          console.log("get token response",res);
          this.getTokenUser=res
          this.getTokenUserData=this.getTokenUser.authdata.var2[0]
          console.log("get getTokenUserData----",this.getTokenUserData);
          this.router.navigateByUrl('/home',{state:{tokenuserdata:this.getTokenUserData}})
        })
      }else{
        console.log("token is not present----");
        alert("Something wrong, try again :-( ")
      }
      
    })
  }

}
