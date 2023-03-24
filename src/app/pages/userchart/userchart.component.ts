import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-userchart',
  templateUrl: './userchart.component.html',
  styleUrls: ['./userchart.component.scss']
})
export class UserchartComponent implements OnInit {
  public chart: any;

  hrSd:any=[]
  hr=0;
  sd=0;
  un=0;

  count={}

  constructor(private globalservice:GlobalService) {
    this.globalservice.getHRSD().subscribe(res=>{
      // console.log("get all HR AND SOFTWARE DEVEMPOER",res);
      this.hrSd=res
      console.log("get all HR AND SOFTWARE DEVEMPOER",this.hrSd);

      if(this.hrSd.length>0){
        this.hr=0;
        this.sd=0;
        this.un=0;

        console.log("get user");
        for(let i=0;i<=this.hrSd.length-1;i++){
          console.log("i",this.hrSd[i]);
          if(this.hrSd[i].status=="1"){
            this.hr +=1
            console.log("count hr",this.hr);
          }else if(this.hrSd[i].status=="2"){
            this.sd +=1;
            console.log("count sd",this.sd);
            
          }else{
            console.log("not get both");
            this.un +=1;
            console.log("get un value",this.un);
            
          }
        }
        
      }else{
        console.log("user not found user");
      }
      
    })
  }

  ngOnInit(): void {
   setTimeout(()=>{
    this.createChart();
   },3000)
  }

  createChart(){
    console.log("hr and sd",this.hr , this.sd);
    
  
    this.chart = new Chart("UsersChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2023'], 
	       datasets: [
          {
            label: "HR",
            data: [this.hr],
            backgroundColor: 'blue'
          },
          {
            label: "Software Developer",
            data: [this.sd],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

}
