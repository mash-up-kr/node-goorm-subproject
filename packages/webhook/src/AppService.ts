import { Injectable } from '@nestjs/common';
import { runAll } from './utils/run';

@Injectable()
export class AppService {
  async update(sha: string) {
    return await runAll(`
      git reset --hard

      git clean -fd

      git checkout master

      git pull origin master

      git checkout ${sha}

      pnpm install --frozen-lockfile

      turbo build

      pm2 reload app

      pm2 reload webhook
    `);
  }
}
