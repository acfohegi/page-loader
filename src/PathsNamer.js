import path from 'node:path';

export default class PathsNamer {
  constructor(urlString, options) {
    this.url = new URL(urlString);
    this.output = options.output ?? '.';
  }

  getNormalizedUrl() {
    const protocolless = this.url.href
      .replace(this.url.protocol, '')
      .replace(/^\/\//, '');
    return PathsNamer.normalizeString(protocolless);
  }

  getHtmlFilePath() {
    const dirPath = this.output;
    const normalizedUrl = this.getNormalizedUrl();
    return `${path.join(dirPath, normalizedUrl)}.html`;
  }

  getSourcesDirName() {
    const normalizedUrl = this.getNormalizedUrl();
    return `${normalizedUrl}_files`;
  }

  getSourcesDirPath(dirname) {
    return path.join(this.output, dirname);
  }

  getSourceFileName(filepath) {
    const url = new URL(filepath, this.url.origin);
    const { dir, name, ext } = path.parse(url.pathname);
    const rawBasename = path.join(url.host, dir, name);
    const basename = PathsNamer.normalizeString(rawBasename);
    return `${basename}${ext}`;
  }

  getSourceFullPath(filename, dir) {
    return path.join(this.output, dir, filename);
  }

  getSourceUrl(filepath) {
    return new URL(filepath, this.url.origin);
  }

  static normalizeString(str) {
    return str.replace(/[^0-9a-zA-Z]/g, '-');
  }
}
