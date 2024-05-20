import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent implements OnInit {
  displayedColumns: string[] = ['product', 'price', 'quantity', 'total'];
  totalAmount: number = 0;
  shippingAddress: string = '';
  paymentMethod: string = '';
  creditCardInfo: any = null;
  dataSource = new MatTableDataSource<Product>();


  productItems: Product[] = [
    { id: 1, name: 'Product 1', price: 100, quantity: 2, image: 'https://picsum.photos/150/150?random=1' },
    { id: 2, name: 'Product 2', price: 200, quantity: 1, image: 'https://picsum.photos/150/150?random=2' },
  ];

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProductItems();
  }

  loadProductItems() {
    this.dataSource.data = this.productItems;
    console.log(this.dataSource.data);
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.productItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  confirmPayment() {
    // Implement payment processing logic here
    console.log('Payment confirmed');
  }

  openCreditCardDialog() {
  //   const dialogRef = this.dialog.open(CreditCardDialogComponent, {
  //     width: '250px',
  //     data: { creditCardInfo: this.creditCardInfo }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.creditCardInfo = result;
  //   });
  // }

  // isPaymentInfoComplete() {
  //   return this.shippingAddress.length > 0 && this.paymentMethod !== '' &&
  //          (this.paymentMethod !== 'creditCard' || this.creditCardInfo);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
