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
  storeLoginTokenT:any='';

  getTokenUser:any;
  getTokenUserData:any


  constructor(private globalservice:GlobalService,private router:Router ,private location:Location) { }

  ngOnInit(): void {
    this.getNewUserInfo()
  }


  getNewUserInfo(){
    this.registerUser=this.location.getState()
    console.log("get new register user data----",this.registerUser);

    if(this.registerUser.newuser !=undefined || this.registerUser.newuser !=null){
      this.registerUserEmail=this.registerUser.newuser.email
      this.registerUserPassword=this.registerUser.newuser.password
      console.log("get new user emial and password----",this.registerUserEmail,this.registerUserPassword);
    }else{
      console.log("user not register----");
      
    }
   
    
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

        //save token in localStorage
        localStorage.setItem("localSession", JSON.stringify(this.storeLoginTokenT))

        this.clearLocalStorage()

        const data2={
          authentication:this.storeLoginTokenT
        }
        this.globalservice.checkToken(data2).subscribe(res=>{
          console.log("get token response",res);
          this.getTokenUser=res
          this.getTokenUserData=this.getTokenUser.authdata.var2[0]

          if(this.getTokenUserData !=undefined){
            console.log("get getTokenUserData----",this.getTokenUserData);
            this.router.navigateByUrl('/home',{state:{tokenuserdata:this.getTokenUserData}})
            
          }else{
            console.log("token not have any user data, user is new");
            alert("Email Or Password incorrect, Register Now")
            
          }
         
        })
      }else{
        console.log("token is not present----");
        alert("Something wrong, try again :-( ")
      }
      
    })
  }



  clearLocalStorage(){
    console.log("call local storage in login component for window reload after 5 min");
    setTimeout(()=>{
    window.location.reload()
    alert("Seession is over login again :-)")
    localStorage.clear();
    },300000)
  }

}
