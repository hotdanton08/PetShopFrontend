// src/app/components/faq/faq.component.ts
import { Component, OnInit } from '@angular/core';
// import { FaqService } from '../../services/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faqs: any[] = [
    { question: '如何重置密碼？', answer: '您可以通過點擊“忘記密碼”鏈接來重置您的密碼。' },
    { question: '如何聯繫客服？', answer: '您可以通過我們的幫助中心頁面聯繫客服。' },
    { question: '如何修改個人信息？', answer: '您可以在帳戶設置頁面修改您的個人信息。' }
  ];
  expandedIndex: number | null = null;

  // constructor(private faqService: FaqService) { }

  constructor() {}

  ngOnInit(): void {
    // this.faqService.getFaqs().subscribe(data => {
    //   this.faqs = data;
    // });
  }

  toggle(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
}
