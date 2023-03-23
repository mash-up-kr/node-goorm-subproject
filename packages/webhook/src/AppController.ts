import { Controller, Get, Param, Res, Post } from '@nestjs/common';
import { AppService } from './AppService';
import { FastifyReply } from 'fastify';
import { spawn } from 'child_process';

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
  @Post('/deploy')
  async deploy(@Res() response: FastifyReply) {
    try {
      spawn('sh', ['../cicd-script.sh']);
    } catch (error) {
      if (error) {
        // TODO handle error -> send discord alarm??
        console.error('Error while deploying', error);
      }
    }
  }
}
