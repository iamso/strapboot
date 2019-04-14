import app from './app';
import SiteLoader from '../lib/siteloader.js';

app.on('init', () => {
  app.loader = new SiteLoader();
});
