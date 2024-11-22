// src/app/pages/home/product-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProductDetailService } from '../../services/product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  name: string = '';
  images: string[] = [];
  selectedImage!: string;
  soldCount: number = 0;
  price: number = 0;
  productOptions: any[] = [];
  selectedOption = this.productOptions[0];
  isLoggedIn: boolean = false; // This should be dynamically checked
  description: string = '';
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productDetailService: ProductDetailService
  ) {}

  async ngOnInit(): Promise<void> {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      try {
        // 從後端 API 取得產品資料
        const response = await firstValueFrom(
          this.productDetailService.getProductDetailById(productId)
        );

        // 將取得的資料綁定到 productDetails 上
        this.name = response.name;
        this.images = response.images || [];
        this.selectedImage = this.images[0];
        this.soldCount = response.sold;
        this.price = response.price;
        this.description = response.description;
        this.productOptions = response.options || [];
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }

  selectOption(option: any) {
    this.selectedOption = option;
  }

  addToCart() {
    if (!this.isLoggedIn) {
      // Navigate to login page
      console.log('Navigate to login');
    } else {
      // API call to add to cart
      console.log('Added to cart');
    }
  }

  checkAvailability() {
    // Check if selected option is available
    console.log('Selected option:', this.selectedOption);
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
