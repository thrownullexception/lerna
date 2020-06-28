import { Faq } from './faqs.entity';

export class FaqsTransformer {
  question: string;
  answer: string;
  id: string;
  admin: string;

  constructor(faq: Faq) {
    this.id = faq.id;
    this.question = faq.question;
    this.answer = faq.answer;
    if (faq.lastTouchedBy$1) {
      this.admin = faq.lastTouchedBy$1.username;
    }
  }
}
