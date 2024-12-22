import { NestMiddleware, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Incoming Request:');
    console.log('URL:', req.originalUrl);
    console.log('Method:', req.method);
    console.log('Headers:', req.headers);
    console.log('=======================\n');
    next();
  }
}
