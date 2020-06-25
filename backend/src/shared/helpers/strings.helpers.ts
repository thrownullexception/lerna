import * as randomstring from 'randomstring';

export class StringHelpers {
  static generateRandomString(length = 12): string {
    return randomstring.generate(length);
  }

  static generateRandomNumbers(length: number): string {
    return randomstring.generate({
      length,
      charset: 'numeric',
    });
  }
}
