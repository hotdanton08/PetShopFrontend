import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

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
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });

  selectedLanguage = 'zh-TW';
  products: Product[] = [];
  searchQuery: string = '';
  topBarFixed:boolean = false;
  currentBannrIndex = 0;
  intervalBannerId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: 'https://picsum.photos/1500/400?random=1',
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    };
    this.slides[1] = {
      id: 1,
      src: 'https://picsum.photos/1500/400?random=2',
      title: 'Second slide',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    };
    this.slides[2] = {
      id: 2,
      src: 'https://picsum.photos/1500/400?random=3',
      title: 'Third slide',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    };
    this.loadProducts();
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
      { name: '產品', price: 100, image: 'https://picsum.photos/150/150?random=1' },
      { name: '產品', price: 100, image: 'https://picsum.photos/150/150?random=2' },
      { name: '產品', price: 100, image: 'https://picsum.photos/150/150?random=3' },
      { name: '產品', price: 100, image: 'https://picsum.photos/150/150?random=4' },
      { name: '產品', price: 100, image: 'https://picsum.photos/150/150?random=5' },
      { name: '產品', price: 100, image: 'https://picsum.photos/150/150?random=6' },
      { name: '產品', price: 100, image: 'https://picsum.photos/150/150?random=7' },
      { name: '產品', price: 100, image: 'https://picsum.photos/150/150?random=8' },
      { name: '產品', price: 100, image: 'https://picsum.photos/150/150?random=9' },
      { name: '產品', price: 200, image: 'https://picsum.photos/150/150?random=10' }
    ]
  }

  changeLanguage() {
    console.log('語言已切換:', this.selectedLanguage);
  }

  goToProductDetail(product: any) {
    // 假設產品詳情路由設置為 '/products/:id'
    this.router.navigate(['/products', product.id]);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
