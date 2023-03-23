import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './AppService';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/update/:sha')
  async updateMainServer(@Param('sha') sha: string) {
    return await this.appService.update(sha);
  }
}
