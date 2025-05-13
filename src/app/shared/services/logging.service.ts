import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(message: any, ...optional: any[]) {
    console.log('[LOG]:', message, ...optional);
  }
  error(message: any, ...optional: any[]) {
    console.error('[ERROR]:', message, ...optional);
  }
  warn(message: any, ...optional: any[]) {
    console.warn('[WARN]:', message, ...optional);
  }
}