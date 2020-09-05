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

  static plainAndEllipsize(text: string, length = 120): string {
    if (text.length > length) {
      return text.substr(0, length) + '...';
    }
    return text;
  }
}
