import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
	providers: [AppService, HttpService],
	controllers: [AppController],
	imports :[HttpModule],
})
export class AppModule {}