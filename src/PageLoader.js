import debug from 'debug';
import PathsNamer from './PathsNamer.js';
import SourceGetter from './SourceGetter.js';
import SourcesProcessor from './SourcesProcessor.js';
import FileSaver from './FileSaver.js';
import PageLoaderError from './errors/PageLoader.js';

const plLog = debug('page-loader');

class PageLoader {
  constructor(url, options) {
    this.pathsNamer = new PathsNamer(url, options);
  }

  load() {
    const pn = this.pathsNamer;
    plLog('PathsNamer:', pn);
    return SourceGetter.getHtml(pn.url)
      .then((html) => {
        const sp = new SourcesProcessor(html, pn);
        return sp.process();
      })
      .then((sources) => {
        const fs = new FileSaver(sources, pn);
        return fs.save()
          .then((htmlPath) => {
            plLog('Files are saved. htmlPath:', htmlPath);
            return htmlPath;
          });
      })
      .catch((e) => {
        plLog(e);
        throw new PageLoaderError(e.message);
      });
  }
}

export default PageLoader;
