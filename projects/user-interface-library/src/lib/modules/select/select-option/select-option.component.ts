import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uilibrary-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.css']
})
export class SelectOptionComponent implements OnInit {
  @Input() value: any;
  @Input() label: string = "";

  constructor() { }

  ngOnInit() {
    
  }
}
