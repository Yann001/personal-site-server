import fs from 'fs';
import util from 'util';

import blogModel from '../model/blog/blog';

const readFile = util.promisify(fs.readFile);
class Blog {
  constructor () {}
  async save (req, res, next) {
    console.log(`post on '/blog/save'`);
    // validation
    if (req.body.user && req.body.user.nickName === 'Yann' && req.body.user.password === '123123') {
      let obj = {};
      Object.assign(obj, req.body);
      obj.createTime = Date.now();
      obj.updateTime = Date.now();
      let model = new blogModel(obj);
      try {
        let ret = await model.save();
        res.json({
          result: {
            code: 200,
            msg: 'ok'
          },
          data: ret
        });
      } catch (error) {
        res.json({
          result: {
            code: 400,
            msg: 'model save error'
          },
          data: error
         });
      }
    } else {
      res.json({
        result: {
          code: 300,
          msg: 'ilegal user'
        },
        data: {}
      })
    }
  }
  async getBlogAllTypes (req, res, next) {
    console.log(`get on '/blog/getBlogAllTypes'`);
    try {
      let file = await readFile('config/blog-type.json');
      res.json({
        result: {
          code: 200,
          msg: 'ok'
        },
        data: JSON.parse(file)
      });
    } catch (error) {
      console.log(error)
      res.json({
        result: {
          code: 403,
          msg: 'read config file error'
        },
        data: error
      });
    }
  }
}

export default new Blog();
