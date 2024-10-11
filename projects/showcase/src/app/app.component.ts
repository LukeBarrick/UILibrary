import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserInterfaceLibraryModule, LibIconService } from '../../../uilibrary/src/public-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserInterfaceLibraryModule],
  providers: [LibIconService],
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
