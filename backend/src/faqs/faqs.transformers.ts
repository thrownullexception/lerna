import { Faq } from './faqs.entity';

export class FaqsTransformer {
  question: string;
  answer: string;
  id: number;
  admin: string;

  constructor(faq: Faq) {
    this.id = faq.id;
    this.question = faq.question;
    this.answer = faq.answer;
    if (faq.admin) {
      this.admin = faq.admin.username;
    }
  }
}
