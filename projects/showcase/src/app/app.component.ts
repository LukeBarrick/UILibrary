import { Component, Inject, inject, LOCALE_ID, OnInit } from '@angular/core';
import { LibIconService } from 'uilibrary';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'showcase';

  private libIconService = inject(LibIconService);

 
  constructor(@Inject(LOCALE_ID) protected localeId: string) {
  
    
  }

  ngOnInit(): void {
    this.libIconService.registerIcons();
    console.log(this.localeId)
  }
}
