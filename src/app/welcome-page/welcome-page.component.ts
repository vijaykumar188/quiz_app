import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {


  // @ViewChild('name') nameKey!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  name: any

  startQuiz(){
    // localStorage.setItem("name",this.nameKey.nativeElement.value);
    localStorage.setItem("name",this.name)
  }

}
