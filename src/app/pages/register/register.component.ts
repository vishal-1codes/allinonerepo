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


  //18 lets go to login page
  newUserInfo:any;

 

  empArr = [
    { id: 1, role: "HR" },
    { id: 2, role: "Software Developer" },
  ];

  registerForm = new FormGroup({
    emailv: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    passv: new FormControl('', Validators.required),
    empv: new FormControl('', Validators.required),
  });

  constructor(private globalservice:GlobalService,private router:Router) {
    
  }

  ngOnInit(): void {
  }


  onSubmit() {
    console.log("get data",this.registerForm.value);
    this.checkEmailPresentOrNot()
  }

  checkEmailPresentOrNot(){
    // console.log("checkEmailPresentOrNot call",this.registerForm.value.emailv);
    this.globalservice.checkEmail(this.registerForm.value.emailv).subscribe(res=>{
      console.log("check emil",res);
      this.emailResArr=res
      console.log("get res and length",this.emailResArr,this.emailResArr.length);
      
      if(this.emailResArr.length==0){
        console.log("email is new");
        this.createNewUser()
      }else{
        console.log("emil is old,show alert");
        alert("Email is existing, please register with new email")
      }
    })
  }

  createNewUser(){
    console.log("create new login",this.registerForm);
    const data1={
      "email":this.registerForm.value.emailv,
      "password":this.registerForm.value.passv,
      "status":this.registerForm.value.empv
    }

    this.globalservice.createNewUser(data1).subscribe(res=>{
      // console.log("get register token",res);
      alert("congratulations,your id is created,check out login page, lets go..")
      this.newUserInfo=res
      console.log("register new user info",this.newUserInfo);
      this.router.navigateByUrl('/login',{state:{newuser:this.newUserInfo}})
    })
  }



}
