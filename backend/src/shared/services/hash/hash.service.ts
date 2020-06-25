import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {
  async make(text: string): Promise<string> {
    return await bcrypt.hash(text, 10);
  }

  async compare(plainString: string, hashedString: string): Promise<boolean> {
    return await bcrypt.compare(plainString, hashedString);
  }
}
