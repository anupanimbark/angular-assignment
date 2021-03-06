import { DeclareFunctionStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import  empData  from  './Employee.json';
import data from 'src/assets/3e788515-f688-451d-b711-37c890aee01c.json';
// import data1 from 'src/assets/4d473898-8a72-440c-a10b-c26d6f19095b.json';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface arrEmployees{
  id : string;
  first_name: string;
  last_name: string;
  email: string;
  gender:string;
  gross_salary:number;
  designation:string;
  working_days:number;
}
interface arrEachEmp{
  id:string;
  employee_id:string;
  in_time:string;
  out_time:string;
}



@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  // varUrl:any="./assets/575aaf78-39c6-40fa-8177-1c913a3069b8.json"
  
  name = 'Angular';
  closeResult = "";
  objEmployee: arrEmployees[] = empData;

  varTemp1: any;
  varUrl1 : any;
  varUrl2 : any;
  varUrl3 : any;
  varUrl: any;

  varTemp2:any;
  varInTime:any;
  varOutTime:any; 

  splitted1:any;
  splitted2:any;
  splitteda:any;
  splittedb:any;

  hours:any;

  totalhours :any =0;
  
  obj2 : arrEachEmp[]= data;

  

  constructor(private modalService: NgbModal, ) { }
  ngOnInit(): void {
    
  }

  funGetId(emp){

    this.varTemp1=emp

    this.varUrl1="./assets/";
    this.varUrl2=this.varTemp1.id
    this.varUrl3=".json"

    this.varUrl= this.varUrl1 + this.varUrl2 + this.varUrl3;
    // console.log(this.varUrl2)
  }

   hours1 : any = 0;

  funGetHours(empDetails): void{
    this.varTemp2 =empDetails;
    this.varInTime=this.varTemp2.in_time;
    this.varOutTime=this.varTemp2.out_time;

    this.splitted1 = this.varInTime.split(" ", 1);
    this.splitteda = this.splitted1[0].split(":",2);

    this.splitted2 = this.varOutTime.split(" ", 1);
    this.splittedb = this.splitted2[0].split(":",2);

    
    let dateIn: Date = new Date("2021-02-16");   
    dateIn.setHours(this.splitteda[0]);  
    dateIn.setMinutes(this.splitteda[1]);  
    console.log("Date = " + dateIn); 

    let dateOut: Date = new Date("2021-02-16");  
     
    dateOut.setHours(parseInt(this.splittedb[0])+12);  
    dateOut.setMinutes(this.splittedb[1]);  
    console.log("Date = " + dateOut);
    // console.log(dateOut); 

    this.hours = Math.abs(dateOut.getTime() - dateIn.getTime() ) / 36e5;
    
    var temphour=(dateOut.getTime() - dateIn.getTime() ) / 36e5;
    console.log(temphour);
    this.hours1 = parseInt(this.hours1) + parseInt(this.hours);
    var tempnum : number;
    tempnum= +tempnum + +temphour;
    console.log(tempnum);
    this.totalhours=this.hours1;
    
 
  }
 
  
   
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

