export class StringUtil {
  static isValid(str: unknown) {
    return str && typeof str === 'string' && str.length > 0;
  }

  static isValidEmail(str: string) {
    return str.includes('@');
  }
}
