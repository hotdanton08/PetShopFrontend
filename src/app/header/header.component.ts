import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() headerName: string = '';

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/home']);
  }
}
