// src/app/pages/home/home.component.ts

import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { firstValueFrom, Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { BannerService } from '../../services/banner.service';

interface Product {
  name: string;
  price: number;
  image: string;
  sold: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  slides: any[] = [];
  bannerImageLoaded: boolean[] = []; // 追踪圖片是否加載的陣列
  productImageLoaded!: boolean[];
  errorImage: string = 'https://fakeimg.pl/1500x400/';

  selectedLanguage = 'zh-TW';
  products: Product[] = [];
  topBarFixed: boolean = false;
  currentBannrIndex = 0;
  intervalBannerId: any;
  cols: number = 5; // 默認列數
  breakpointSubscription: Subscription | undefined;
  productsTest: any[] = [];
  productImageLoadedTest!: boolean[];
  bannerLoaded: boolean = false; // banner 加載狀態

  // 分頁相關屬性
  length = 0; // 總記錄數
  pageSize = 10; // 每頁顯示的記錄數
  pageSizeOptions: number[] = [10, 20, 50]; // 分頁選項

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private productService: ProductService,
    private bannerService: BannerService
  ) {}

  ngOnInit(): void {
    this.loadBanners();
    this.loadProducts();
    this.setupGridCols();
  }

  async loadBanners() {
    try {
      const response = await firstValueFrom(this.bannerService.getAllBanners());
      this.slides = response.map((banner: any, index: number) => ({
        id: index,
        src: banner.imageUrl,
        link: banner.linkUrl,
        title: banner.title,
        subtitle: banner.subtitle,
      }));

      this.bannerImageLoaded = new Array(this.slides.length).fill(false);
      this.preloadImages();
      this.bannerLoaded = true;
    } catch (error) {
      console.error('Error loading banners:', error);
    }
  }

  preloadImages() {
    for (const slide of this.slides) {
      const img = new Image();
      img.src = slide.src;
    }
  }

  onBannerImageLoad(index: number) {
    this.bannerImageLoaded[index] = true;
  }

  onProductImageLoad(index: number) {
    this.productImageLoaded[index] = true;
  }

  ngOnDestroy() {
    clearInterval(this.intervalBannerId);
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 100) {
      this.topBarFixed = true;
    } else {
      this.topBarFixed = false;
    }
  }

  loadProducts(pageIndex: number = 0, pageSize: number = this.pageSize) {
    // 從服務器獲取產品數據，支援分頁
    this.productService
      .getProducts(pageIndex + 1, pageSize)
      .subscribe((response) => {
        this.products = response.data;
        this.length = response.total;
        this.productImageLoaded = new Array(this.products.length).fill(false);
      });
  }

  handlePageEvent(event: PageEvent) {
    this.loadProducts(event.pageIndex, event.pageSize);
  }

  goToProductDetail(product: any) {
    console.log('Navigating to product:', product.id);
    this.router.navigate(['/product-detail', product.id]); // 正確的路徑
  }

  setupGridCols() {
    // 設置響應式斷點監聽
    this.breakpointSubscription = this.breakpointObserver
      .observe([
        '(max-width: 600px)',
        '(max-width: 960px)',
        '(max-width: 1280px)',
        '(max-width: 1600px)',
        '(max-width: 1920px)',
      ])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          if (state.breakpoints['(max-width: 600px)']) {
            this.cols = 1;
          } else if (state.breakpoints['(max-width: 960px)']) {
            this.cols = 2;
          } else if (state.breakpoints['(max-width: 1280px)']) {
            this.cols = 3;
          } else if (state.breakpoints['(max-width: 1600px)']) {
            this.cols = 4;
          } else if (state.breakpoints['(max-width: 1920px)']) {
            this.cols = 5;
          }
        }
      });
  }
}
