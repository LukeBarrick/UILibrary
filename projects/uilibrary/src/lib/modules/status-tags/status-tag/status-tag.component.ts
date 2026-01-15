import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'uilibrary-status-tag',
    templateUrl: './status-tag.component.html',
    standalone: false
})
export class StatusTagComponent implements OnInit {

  @Input() statusType: string = '';
  
  constructor() { }

  ngOnInit() {
  }
}
