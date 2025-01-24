import { Component, inject, OnInit } from '@angular/core';
import { LibIconService, UserInterfaceLibraryModule } from 'uilibrary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'showcase';

  private libIconService = inject(LibIconService);

  ngOnInit(): void {
    this.libIconService.registerIcons();
  }
}
