import fs from 'fs';

import {Injectable} from '@/core/decorator';

interface FileRead {
  path: string;
  name: string;
}

interface FileWrite<T> extends FileRead {
  data: T;
}

@Injectable()
export class StateService {
  private readonly rootPath: string = '';

  constructor() {
    this.rootPath = process.cwd();
  }

  read({path, name}: FileRead) {
    this.initialize({path, name});

    const result: string = fs.readFileSync(this.generateFilePath({path, name}), 'utf-8');
    return JSON.parse(result);
  }

  write<T>({path, name, data}: FileWrite<T>) {
    fs.writeFileSync(this.generateFilePath({path, name}), JSON.stringify(data, null, 2), {});
  }

  initialize({path, name}: FileRead) {
    if (!this.isExistsPath({path})) {
      fs.mkdirSync(this.generatePath({path}), {recursive: true});
    }

    if (!this.isExistsFile({path, name})) {
      this.write({path, name, data: []});
    }
  }

  private isExistsPath({path}: { path: string }): boolean {
    return fs.existsSync(this.generatePath({path}));
  }

  private isExistsFile({path, name}: FileRead): boolean {
    return fs.existsSync(this.generateFilePath({path, name}));
  }

  private generatePath({path}: { path: string }): string {
    return `${this.rootPath}/public/state/${path}`;
  }

  private generateFilePath({path, name}: FileRead): string {
    return `${this.generatePath({path})}/${name}`;
  }
}
