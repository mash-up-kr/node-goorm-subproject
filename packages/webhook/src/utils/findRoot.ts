import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export function findGitRootPath(currentPath = process.cwd()) {
  for (const directory of findParentDirectoryOf(currentPath, os.homedir())) {
    if (fs.existsSync(path.join(directory, '.git'))) {
      return directory;
    }
  }
  throw new Error('.git 폴더를 찾을 수 없습니다.');
}

export function* findParentDirectoryOf(baseDirectoryPath: string, until = process.cwd()): IterableIterator<string> {
  if (!baseDirectoryPath.startsWith('/')) {
    throw new Error(`base directory path는 '/'로 시작하는 절대경로여야합니다. given: ${baseDirectoryPath}`);
  }
  do {
    yield baseDirectoryPath;
    baseDirectoryPath = path.join(baseDirectoryPath, '..');
  } while (baseDirectoryPath !== until || baseDirectoryPath !== os.homedir());
}
