// src/app/components/faq/faq.component.ts
import { Component, OnInit } from '@angular/core';
// import { FaqService } from '../../services/faq.service';

interface Faq {
  category: string;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  faqs: Faq[] = [
    {
      category: '新手上路',
      question: '如何註冊帳戶？',
      answer: '點擊首頁的註冊按鈕開始註冊過程。',
    },
    {
      category: '訂單與物流',
      question: '如何追蹤我的訂單？',
      answer: '在您的帳戶頁面中可以找到訂單追蹤選項。',
    },
    {
      category: '退貨與退款',
      question: '如何申請退款？',
      answer: '請通過您的訂單詳情頁面提交退款申請。',
    },
    {
      category: '購物安全與其他',
      question: '如何確保購物安全？',
      answer: '我們使用先進的加密技術來保護您的交易安全。',
    },
    {
      category: '付款或帳務問題',
      question: '付款失敗怎麼辦？',
      answer: '請確認您的付款資訊正確無誤，或聯繫客服獲取幫助。',
    },
    {
      category: '優惠與促銷活動',
      question: '如何使用優惠券？',
      answer: '在結帳頁面選擇您要使用的優惠券。',
    },
    {
      category: '電子票券與繳費',
      question: '電子票券如何使用？',
      answer: '購買後將獲得電子票券，憑票券至相關場所使用。',
    },
  ];
  filteredFaqs: Faq[] = [];
  currentCategory: string = '';

  // constructor(private faqService: FaqService) { }

  constructor() {}

  ngOnInit(): void {
    this.filteredFaqs = this.faqs; // 初始加載所有問題

    // this.faqService.getFaqs().subscribe(data => {
    //   this.faqs = data;
    // });
  }

  selectTab(index: number) {
    if (index === 0) {
      this.filteredFaqs = this.faqs; // 選擇 "全部問題"
      this.currentCategory = '';
    } else {
      const categories = [
        '全部問題',
        '新手上路',
        '訂單與物流',
        '退貨與退款',
        '購物安全與其他',
        '付款或帳務問題',
        '優惠與促銷活動',
        '電子票券與繳費',
      ];
      this.filteredFaqs = this.faqs.filter(
        (faq) => faq.category === categories[index],
      );
      this.currentCategory = categories[index];
    }
  }
}
