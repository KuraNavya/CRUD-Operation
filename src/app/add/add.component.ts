import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  employeeForm!:FormGroup;
  isFormSubmitted:boolean = false;

  @Input() editEmployee:any;
  

  designationList: any[]=[];
  roleList:any[]=[];
  emailRegEx= '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  stepsList:any[]=[
    {stepName : 'Basic Details', isComplete: false},
    {stepName : 'Skills', isComplete: false},
    {stepName : 'Experience', isComplete: false},

  ]

  activeStep:any = this.stepsList[0];
  stepperCompletionValue : number = 8;
  isCreateView :boolean = false;

  constructor(private fb: FormBuilder, private router : Router, private emp_serv: EmployeeService){}

  ngOnInit(): void {
    console.log(this.editEmployee)

    // from create swagger
    this.employeeForm = this.fb.group({
      
      userName: [''],
      empCode: [''],
      empId: [0],
      empName: ['', Validators.required],
      empEmailId:  [null , [Validators.required]],
     // 'empDesignationId': 0,
    empContactNo: [null,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      empAltContactNo: [''],
      empPersonalEmailId: [''],
      empExpTotalYear :[ 0],
      empExpTotalMonth: [0],
      empCity : [''],
      empState: [''],
      empPinCode: [''],
      empAddress: [''],
      empPerCity: [''],
      empPerState: [''],
      empPerPinCode: [''],
      empPerAddress: [''],
      password: [''],
      erpEmployeeSkills : this.fb.array([]),
      ermEmpExperiences :  this.fb.array([])
    })

    if(this.editEmployee){
      this.employeeForm.patchValue({
        userName: this.editEmployee.userName,
      empCode: this.editEmployee.empCode,
    //  empId: this.editEmployee.empName,
    //  empName: ['', Validators.required],
      empEmailId: this.editEmployee.empEmailId,
     // 'empDesignationId': 0,
    empContactNo: this.editEmployee.empContactNo,
      empAltContactNo: this.editEmployee.empAltContactNo,
      empPersonalEmailId: this.editEmployee.empPersonalEmailId,
      empExpTotalYear : this.editEmployee.empExpTotalYear,
      empExpTotalMonth: this.editEmployee.empExpTotalMonth,
      empCity : this.editEmployee.empCity,
      empState: this.editEmployee.empState,
      empPinCode: this.editEmployee.empPinCode,
      empAddress: this.editEmployee.empAddress,
      empPerCity: this.editEmployee.empPerCity,
      empPerState: this.editEmployee.empPerState,
      empPerPinCode: this.editEmployee.empPerPinCode,
      empPerAddress: this.editEmployee.empPerAddress,
      password: this.editEmployee.password, 
      })

      this.editEmployee.erpEmployeeSkills?.forEach((skill:any)=>{
        const skillForm = this.fb.group({
          empId: [skill.empId],
          empSkillId: [skill.empSkillId],
          skill: [skill.skill],
          totalYearExp : [skill.totalYearExp],
          lastVersionUsed: [skill.lastVersionUsed],
        });
        this.erpEmployeeSkills.push(skillForm)
      })
    }
    this.loadRoles();
    this.loadDesignation();
  }

  get erpEmployeeSkills():FormArray{
    return this.employeeForm.get('erpEmployeeSkills') as FormArray;
  }

  get f(){
    return this.employeeForm?.controls;
  }
  
  addSkill(){
    const skillForm = this.fb.group({
      empSkillId: [0],
      empId: [0],
      skill: [''],
      totalYearExp : [''],
      lastVersionUsed : ['']
    });

    this.erpEmployeeSkills.push(skillForm);
  }


  saveSkill(){
    const erpEmployeeSkills = this.employeeForm.get('erpEmployeeSkills')?.value;
    console.log(erpEmployeeSkills);
  }

  deleteSkill(index: number){
    this.erpEmployeeSkills.removeAt(index);
  }


  get experiences(): FormArray{
    return this.employeeForm.get('ermEmpExperiences') as FormArray;
  }


  emailValidator(control:AbstractControl): {[key:string] : any} |null{
    if(!control.value || control.value == '') return null;

    let email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    const patternEmail = email.test(control.value);
    return patternEmail ?null : {forbiddenName : {value:control.value}};
  }

  addExp(){
    this.experiences.push(this.fb.group({
      empExpId: [0],
      empId: [0],
      companyName: [''],
      startDate: [''],
      endDate: [''],
      designation: [''],
      projectsWorkedOn: ['']
    }))
  }
}
