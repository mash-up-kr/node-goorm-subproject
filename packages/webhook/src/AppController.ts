import { Controller, Get, Param, Res, Post } from '@nestjs/common';
import { AppService } from './AppService';
import { FastifyReply } from 'fastify';
import { spawn } from 'child_process';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService, private httpService: HttpService) {}
	
	@Get('/tastyzip')
	async getData(): Promise<any> {
		const url =
			'https://api.odcloud.kr/api/15076265/v1/uddi:02d9700b-a902-454b-b134-b60bfa1a2112?page=1&perPage=100&serviceKey=jJcQNp14IhRdPjUg7Qc8aK0dpEPT8An93npyotIQKDZ8b7i7xFHJDh8AEMVQYrWPWT%2BYUUDX7yAYBOnxwe6%2FLg%3D%3D';
		try {
			const response = await this.httpService.get(url).toPromise();
			if (response) {
				return response.data;
			}
		} catch (error) {
			console.error(error);
		}
	}

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