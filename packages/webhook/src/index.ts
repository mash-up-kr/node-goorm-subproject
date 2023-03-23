import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './AppModule';
import { Logger } from '@nestjs/common';

async function main() {
	const PORT = 3000;
	// const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
	//   logger: new Logger(),
	// });
	const app = await NestFactory.create(AppModule);

	app.listen(PORT, () => {
		console.log(`tastyzip good server starts listening on port ${PORT}`);
	});
}

main();