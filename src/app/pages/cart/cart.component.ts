import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

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
  dataSource = new MatTableDataSource<CartItem>();
  selection = new SelectionModel<CartItem>(true, []);

  cartItems: CartItem[] = [
    {
      id: 1,
      name: '產品一',
      price: 100,
      quantity: 1,
      image: 'https://picsum.photos/150/150?random=1',
    },
    {
      id: 2,
      name: '產品二',
      price: 200,
      quantity: 2,
      image: 'https://picsum.photos/150/150?random=2',
    },
    {
      id: 3,
      name: '產品三',
      price: 300,
      quantity: 3,
      image: 'https://picsum.photos/150/150?random=3',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataSource.data = this.cartItems;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
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
    this.dataSource.data = this.dataSource.data.filter((i) => i.id !== item.id);
    this.selection.deselect(item);
    // Optionally trigger a backend delete here using DELETE /cart/{id}
  }

  calculateNum() {
    return this.selection.selected.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0,
    );
  }

  calculateTotal() {
    return this.selection.selected.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0,
    );
  }

  checkout() {
    // Here you could navigate to a checkout page
    console.log('Going to checkout', this.selection.selected);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
