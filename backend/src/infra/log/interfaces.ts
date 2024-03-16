export interface ILogger {
  info: (msg: unknown, ...args: any[]) => void;
  error: (msg: unknown, trace?: string, ...args: any[]) => void;
  warn: (msg: unknown, ...args: any[]) => void;
}
