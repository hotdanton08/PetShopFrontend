// src/app/components/cart/cart.component.ts

import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'product',
    'price',
    'quantity',
    'total',
    'actions',
  ];
  cartItems: CartItem[] = [];
  selection = new SelectionModel<CartItem>(true, []);

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.cartService
        .getCartByUserId(parseInt(userId))
        .subscribe((response) => {
          console.log(response);
          this.cartItems = response.cartItems.map((item: any) => ({
            id: item.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.image,
          }));
        });
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.cartItems.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.cartItems.forEach((row) => this.selection.select(row));
  }

  updateQuantity(item: CartItem, change: number) {
    const index = this.cartItems.findIndex((x) => x.id === item.id);
    if (index > -1) {
      this.cartItems[index].quantity += change;
      if (this.cartItems[index].quantity < 1) {
        this.cartItems[index].quantity = 1;
      }
    }
    // Optionally trigger a backend update here using PUT /cart/{Id}
  }

  removeFromCart(item: CartItem) {
    this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
    this.selection.deselect(item);
    // Optionally trigger a backend delete here using DELETE /cart/{id}
  }

  calculateNum() {
    return this.selection.selected.reduce(
      (acc, curr) => acc + curr.quantity,
      0
    );
  }

  calculateTotal() {
    return this.selection.selected.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
  }

  checkout() {
    // Here you could navigate to a checkout page
    console.log('Going to checkout', this.selection.selected);
    this.router.navigate(['/checkout']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
