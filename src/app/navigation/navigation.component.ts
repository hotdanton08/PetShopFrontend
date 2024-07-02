import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  searchQuery: string = '';

  constructor(private router: Router) {

  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
