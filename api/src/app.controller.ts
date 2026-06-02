import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  health() {
    return {
      status: 'success',
      service: 'api',
      message: 'Willow backend is running 🚀',
    };
  }
}
