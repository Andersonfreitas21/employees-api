export class DateUtil {
  static isValid(date: unknown): boolean {
    if (date instanceof Date) return true;
    if (typeof date === 'string' || typeof date === 'number') {
      return !isNaN(new Date(date) as any);
    }
  }
}
