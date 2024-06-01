import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

interface Product {
  name: string;
  price: number;
  image: string;
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
  searchQuery: string = '';
  topBarFixed:boolean = false;
  currentBannrIndex = 0;
  intervalBannerId: any;

  constructor(private router: Router, private translate: TranslateService) {
    // 設置默認語言
    this.translate.setDefaultLang('zh-TW');
    this.translate.use(this.selectedLanguage);
  }

  ngOnInit(): void {
    this.preloadImages();
    this.loadProducts();
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
      { name: '犬用超級營養糧-成犬配方 5kg', price: 100, image: 'https://picsum.photos/150/150?random=1' },
      { name: '貓咪護理潔耳液 120ml 專業版', price: 100, image: 'https://picsum.photos/150/150?random=2' },
      { name: '活力兔專用高纖維飼料 3kg', price: 100, image: 'https://picsum.photos/150/150?random=3' },
      { name: '貓咪保健零食-海洋魚油配方 150g 滋補毛髮', price: 100, image: 'https://picsum.photos/150/150?random=4' },
      { name: '高級皮革狗項圈 加厚防斷裂 45cm', price: 100, image: 'https://picsum.photos/150/150?random=5' },
      { name: '安全型寵物電子識別晶片', price: 100, image: 'https://picsum.photos/150/150?random=6' },
      { name: '水族專用活性碳過濾器 200L 淨化水質', price: 100, image: 'https://picsum.photos/150/150?random=7' },
      { name: '鳥類綜合礦物石 250g 提升羽毛亮度', price: 100, image: 'https://picsum.photos/150/150?random=8' },
      { name: '無穀物全犬種洗毛精 500ml 植物香氛', price: 100, image: 'https://picsum.photos/150/150?random=9' },
      { name: 'CeraVe適樂膚 全效亮眼修護精萃 14ml 改善眼周困擾組 官方旗艦店', price: 200, image: 'https://picsum.photos/150/150?random=10' },
      { name: '產品', price: 200, image: 'https://picsum.photos/150/150?random=11' },
      { name: '產品', price: 200, image: 'https://picsum.photos/150/150?random=12' },
      { name: '產品', price: 200, image: 'https://picsum.photos/150/150?random=13' }
    ]

    this.productImageLoaded = new Array(this.products.length).fill(false);
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translate.use(lang);
  }

  goToProductDetail(product: any) {
    // 假設產品詳情路由設置為 '/products/:id'
    this.router.navigate(['/products', product.id]);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
