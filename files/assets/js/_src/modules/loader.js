import app from './app';
import SiteLoader from '../lib/siteloader.js';

import * as utils from './utils';

app.regInit(() => {
  app.loader = new SiteLoader();
});
