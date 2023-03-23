import { Injectable } from '@nestjs/common';
import { GitService } from './GitService';
import { runAll } from './utils/run';

@Injectable()
export class AppService {
  constructor(private readonly gitService: GitService) {}

  async update(sha: string) {
    const gitResults = await this.gitService.safeCheckout(sha);
    if (gitResults.some(({ success }) => success === false)) {
      return gitResults;
    }

    const packageResult = await runAll(`
      pnpm install --frozen-lockfile
      turbo start:prod
    `);

    return [...gitResults, ...packageResult];
  }
}
