import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  async updateMainServer() {
    return { message: 'hello world!' };
  }
}
