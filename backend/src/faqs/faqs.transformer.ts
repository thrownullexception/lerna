import { Faq } from './faqs.entity';

export class FaqTransformer {
  question: string;
  answer: string;
  id: string;
  admin: string;
  accountMode: string;

  constructor(faq: Faq) {
    this.id = faq.id;
    this.question = faq.question;
    this.answer = faq.answer;
    if (faq.lastTouchedBy) {
      this.admin = faq.lastTouchedBy.username;
    }
    if (faq.accountMode) {
      this.accountMode = faq.accountMode.displayName;
    }
  }
}
