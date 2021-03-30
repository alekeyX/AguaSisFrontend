import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  inputControl: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.inputControl = new FormControl();
  }

}
