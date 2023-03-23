import { Injectable } from '@nestjs/common';
import { run, runAll } from './utils/run';

@Injectable()
export class GitService {
  async pull() {
    await run('git pull origin master');
  }

  async checkout(sha: string) {
    await run(`git checkout $${sha}`);
  }

  async safeCheckout(sha: string) {
    await runAll(`
      git reset --hard
      git clean -fd
      git checkout master
      git pull origin master
      git checkout ${sha}
    `);
  }
}
