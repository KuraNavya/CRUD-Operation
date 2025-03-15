import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stepsList : any[]=[
    {stepName : 'Basic Details', isComplete : false},
    {stepName : 'Skills', isComplete : false},
    {stepName : 'Experience',isComplete : false}
  ]
}
