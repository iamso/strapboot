import app from './app';
import SiteLoader from '../lib/siteloader.js';

import * as utils from './utils';

app.on('init', () => {
  app.loader = new SiteLoader();
});
