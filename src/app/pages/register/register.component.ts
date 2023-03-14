import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { GlobalService } from 'src/app/service/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  emailResArr:any=[];
  getRegisterToken:any;
  getUserInfo:any=[];

  empArr = [
    { id: 1, role: "HR" },
    { id: 2, role: "Software Developer" },
  ];

  registerForm = new FormGroup({
    emailv: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    passv: new FormControl('', Validators.required),
    empv: new FormControl('', Validators.required),
  });

  constructor(private globalservice:GlobalService,private router:Router) { }

  ngOnInit(): void {
  }


  onSubmit() {
    console.warn(this.registerForm.value);
    this.checkEmailPresentOrNot()
  }

  checkEmailPresentOrNot(){
    // console.log("checkEmailPresentOrNot call",this.registerForm.value.emailv);
    this.globalservice.checkEmail(this.registerForm.value.emailv).subscribe(res=>{
      // console.log("check emil",res);
      this.emailResArr=res
      // console.log("get res and length",this.emailResArr,this.emailResArr.length);
      
      if(this.emailResArr.length==0){
        // console.log("email is new");
        this.createNewUser()
      }else{
        // console.log("emil is old,show alert");
        alert("Email is existing, please register with new email")
      }
    })
  }

  createNewUser(){
    console.log("create new login");
    const data1={
      "email":this.registerForm.value.emailv,
      "password":this.registerForm.value.passv,
      "status":this.registerForm.value.empv
    }

    this.globalservice.createNewUser(data1).subscribe(res=>{
      // console.log("get register token",res);
      this.getRegisterToken=res;
      console.log("register token inside getRegisterToken",this.getRegisterToken.token,typeof(this.getRegisterToken.token));

      if(this.getRegisterToken!=undefined){
        const data2={
          "authentication":this.getRegisterToken.token
        }
        console.log("get data2",data2);
        
        this.globalservice.checkToken(data2).subscribe(res=>{
          // console.log("get token res",res);
          this.getUserInfo=res
          console.log("get user info in",this.getUserInfo);
          this.router.navigateByUrl('/home',{state:{token:this.getUserInfo}})
        })
      }else{
        console.log("token not genrated");
        
      }
     
    })
  }



}
