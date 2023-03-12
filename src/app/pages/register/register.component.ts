import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  empArr = [
    { id: 1, role: "HR" },
    { id: 2, role: "Software Developer" },
  ];

  emailE="Email"
  password="Password"
  status="Emp Role"

  emailV:string="";
  passwordV:string="";
  statusV:string="";
  

  constructor() { }

  ngOnInit(): void {
  }

  registerFormValue(){
    console.log("get values",this.emailV,this.passwordV,this.statusV);
    
    
  }


}
