import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  eObj : any;
  employeeList :any[]=[];
  isCreateView : boolean = false;


  constructor(private emp_serv: EmployeeService, private route: Router){}

  ngOnInit(): void {
    this.loadAllEmployees();
  }


  loadAllEmployees(){
    this.emp_serv.viewEmployee().subscribe((res:any)=>{
      this.employeeList = res.data;
    })
  }

  onEdit(id:number){
    this.emp_serv.getEmployeeById(id).subscribe((res:any)=>{
      this.eObj= res.data;
      this.eObj.empId=id;
      this.isCreateView = true;
    })
  }

  onDelete(id:number){
    this.emp_serv.deleteEmployeeByEmpId(id).subscribe((res:any)=>{
      if(res.result){
        alert('Employee deleted successfully');
        this.loadAllEmployees();
        this.isCreateView = false;
      }else{
        alert(res.message)
      }
    })
  }

  addNew(){
    this.eObj = undefined;
    this.isCreateView = true;
    this.route.navigateByUrl("/home")
  }
}
