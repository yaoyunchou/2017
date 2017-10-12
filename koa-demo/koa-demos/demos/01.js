const Koa = require('koa');
const app = new Koa();

app.listen(3000);
console.log('Listening:' + (process.env.PORT || 3000));