import express from 'express';
import bodyParser from 'body-parser';

import config from './config/config';
import db from './mongodb/connect';
import router from './router';

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header('Access-Control-Allow-Credentials', true);
  // 注意该项设置，不能只设置X-Requested-With，否则前端无法配置Content-Type等内容
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

router(app);

app.listen(config.port);

console.info(`listen port ${ config.port }`);
