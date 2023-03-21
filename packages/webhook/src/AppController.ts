import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './AppService';
import { FastifyReply } from 'fastify';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/update/:sha')
  async updateMainServer(@Param('sha') sha: string, @Res() response: FastifyReply) {
    const outgoingMessage = response.raw;

    outgoingMessage.statusCode = 200;
    outgoingMessage.statusMessage = 'OK';
    outgoingMessage.setHeader('Content-Type', 'text/plain');
    outgoingMessage.write('H');
    outgoingMessage.write('ello');
    outgoingMessage.end();

    // return await this.appService.updateMainServer({ sha });
  }
}
