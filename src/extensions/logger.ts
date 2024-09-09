export class Logger {
  private readonly prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }
  
  info(msg: string) {
    console.info(`[${this.prefix}]: ${msg}`);
  }

  error(msg: string) {
    console.error(`[${this.prefix}]: ${msg}`);
  }
}