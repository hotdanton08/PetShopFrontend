import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

interface Product {
  name: string;
  price: number;
  image: string;
  sold: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  slides: any[] = [
    { id: 0, src: 'https://picsum.photos/1500/400?random=1', title: 'First slide', subtitle: 'Description 1' },
    { id: 1, src: 'https://picsum.photos/1500/400?random=2', title: 'Second slide', subtitle: 'Description 2' },
    { id: 2, src: 'https://picsum.photos/1500/400?random=3', title: 'Third slide', subtitle: 'Description 3' }
  ];
  bannerImageLoaded: boolean[] = new Array(this.slides.length).fill(false);  // 追踪圖片是否加載的陣列
  productImageLoaded!: boolean[];
  errorImage: string = 'https://fakeimg.pl/1500x400/'

  selectedLanguage = 'zh-TW';
  products: Product[] = [];
  topBarFixed:boolean = false;
  currentBannrIndex = 0;
  intervalBannerId: any;
  cols: number = 5; // 默認列數
  breakpointSubscription: Subscription | undefined;

  constructor(private router: Router, private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.preloadImages();
    this.loadProducts();
    this.setupGridCols();
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

  @HostListener('window:scroll',['$event']) onscroll(){
    if(window.scrollY > 100)
    {
      this.topBarFixed = true;
    }
    else
    {
      this.topBarFixed = false;
    }
  }

  loadProducts() {
    // 假設從API加載產品數據
    this.products = [
      { name: '犬用超級營養糧-成犬配方 5kg', price: 100, image: 'https://picsum.photos/150/150?random=1', sold: 200 },
    { name: '貓咪護理潔耳液 120ml 專業版', price: 100, image: 'https://picsum.photos/150/150?random=2', sold: 150 },
    { name: '活力兔專用高纖維飼料 3kg', price: 100, image: 'https://picsum.photos/150/150?random=3', sold: 120 },
    { name: '貓咪保健零食-海洋魚油配方 150g 滋補毛髮', price: 100, image: 'https://picsum.photos/150/150?random=4', sold: 80 },
    { name: '高級皮革狗項圈 加厚防斷裂 45cm', price: 100, image: 'https://picsum.photos/150/150?random=5', sold: 90 },
    { name: '安全型寵物電子識別晶片', price: 100, image: 'https://picsum.photos/150/150?random=6', sold: 70 },
    { name: '水族專用活性碳過濾器 200L 淨化水質', price: 100, image: 'https://picsum.photos/150/150?random=7', sold: 60 },
    { name: '鳥類綜合礦物石 250g 提升羽毛亮度', price: 100, image: 'https://picsum.photos/150/150?random=8', sold: 50 },
    { name: '無穀物全犬種洗毛精 500ml 植物香氛', price: 100, image: 'https://picsum.photos/150/150?random=9', sold: 200 },
    { name: 'CeraVe適樂膚 全效亮眼修護精萃 14ml 改善眼周困擾組 官方旗艦店', price: 200, image: 'https://picsum.photos/150/150?random=10', sold: 300 },
      { name: '產品', price: 200, sold: 1, image: 'https://picsum.photos/150/150?random=11' },
      { name: '產品', price: 200, sold: 0, image: 'https://picsum.photos/150/150?random=12' },
      { name: '產品', price: 200, sold: 2, image: 'https://picsum.photos/150/150?random=13' }
    ]

    this.productImageLoaded = new Array(this.products.length).fill(false);
  }

  goToProductDetail(product: any) {
    // 假設產品詳情路由設置為 '/products/:id'
    this.router.navigate(['/products', product.id]);
  }

  setupGridCols() {
    // 設置響應式斷點監聽
    this.breakpointSubscription = this.breakpointObserver.observe([
      '(max-width: 600px)',
      '(max-width: 960px)',
      '(max-width: 1280px)',
      '(max-width: 1600px)',
      '(max-width: 1920px)'
    ]).subscribe((state: BreakpointState) => {
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
