
import app from './app';

app.on('init', () => {
  const c = console;
  !app.isEdge && !app.isIE && c && c.log(
    '%cMade with %c❤ %cin Switzerland.',
    'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; color: black; font-size: 14px;',
    'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; color: red; font-size: 14px;',
    'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; color: black; font-size: 14px;'
  );
});
