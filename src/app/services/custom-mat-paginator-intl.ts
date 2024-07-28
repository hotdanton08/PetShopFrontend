import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();
    this.getAndInitTranslations();
  }

  // 初始化翻譯
  getAndInitTranslations() {
    this.translate.onLangChange.subscribe(() => {
      this.getTranslations();
    });
    this.getTranslations();
  }

  // 獲取翻譯並設置 paginator 的標籤
  getTranslations() {
    this.translate
      .get([
        'PAGINATOR.ITEMS_PER_PAGE',
        'PAGINATOR.NEXT_PAGE',
        'PAGINATOR.PREVIOUS_PAGE',
        'PAGINATOR.FIRST_PAGE',
        'PAGINATOR.LAST_PAGE',
        'PAGINATOR.OF_LABEL',
      ])
      .subscribe((translations) => {
        this.itemsPerPageLabel = translations['PAGINATOR.ITEMS_PER_PAGE'];
        this.nextPageLabel = translations['PAGINATOR.NEXT_PAGE'];
        this.previousPageLabel = translations['PAGINATOR.PREVIOUS_PAGE'];
        this.firstPageLabel = translations['PAGINATOR.FIRST_PAGE'];
        this.lastPageLabel = translations['PAGINATOR.LAST_PAGE'];
        this.getRangeLabel = (
          page: number,
          pageSize: number,
          length: number
        ) => {
          if (length === 0 || pageSize === 0) {
            return `0 ${translations['PAGINATOR.OF_LABEL']} ${length}`;
          }
          const startIndex = page * pageSize;
          const endIndex =
            startIndex < length
              ? Math.min(startIndex + pageSize, length)
              : startIndex + pageSize;
          return `${startIndex + 1} - ${endIndex} ${
            translations['PAGINATOR.OF_LABEL']
          } ${length}`;
        };
        this.changes.next();
      });
  }
}
