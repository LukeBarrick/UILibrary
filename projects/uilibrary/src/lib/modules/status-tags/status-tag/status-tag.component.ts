import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uilibrary-status-tag',
  templateUrl: './status-tag.component.html',
})
export class StatusTagComponent implements OnInit {

  @Input() statusType: string = '';
  
  constructor() { }

  ngOnInit() {
  }
}
