import fs from 'fs';
import util from 'util';
import path from 'path';

import blogModel from '../model/blog/blog';
import userModel from '../model/user/user';

const readFile = util.promisify(fs.readFile);
class Blog {
  constructor() { }
  async save(req, res, next) {
    console.log(`post on '/blog/save'`);
    // validation
    if (req.body.user !== undefined) {
      try {
        let userDoc = await userModel.findOne({ _id: req.body.user })
        console.log(userDoc);
        if (userDoc && userDoc._id) {
          let obj = {};
          let ret = {};
          Object.assign(obj, req.body);
          delete obj.id;
          if (req.body.id === -1) { // insert
            console.log('blog insert');
            obj.createTime = Date.now();
            obj.updateTime = Date.now();
            let model = new blogModel(obj);
            ret = await model.save();
          } else { // update
            console.log('blog update');
            obj.updateTime = Date.now();
            await blogModel.updateOne({ id: req.body.id }, obj);
            ret = await blogModel.findOne({ id: req.body.id });
          }
          res.json({
            result: {
              code: 200,
              msg: 'ok'
            },
            data: ret
          });
        } else {
          res.json({
            result: {
              code: 300,
              msg: 'ilegal user'
            },
            data: ret
          });
        }
      } catch (error) {
        console.log(error);
        res.json({
          result: {
            code: 404,
            msg: 'mongoose operate error'
          },
          data: error
        });
      }
    } else {
      res.json({
        result: {
          code: 301,
          msg: 'miss user param'
        },
        data: {}
      });
    }
  }
  async getBlogAllTypes(req, res, next) {
    console.log(`get on '/blog/getBlogAllTypes'`);
    try {
      let file = await readFile(path.join(__dirname, '../config/blog-type.json'));
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
  async getBlog(req, res, next) {
    console.log(`get on '/blog/getBlog'`);
    if (req.query.id !== undefined) {
      try {
        let bolgDoc = await blogModel.findOneAndUpdate({ id: parseInt(req.query.id) }, {$inc: { readCount: 1 }}).populate('user');
        res.json({
          result: {
            code: 200,
            msg: 'ok'
          },
          data: bolgDoc
        });
      } catch (error) {
        res.json({
          result: {
            code: 401,
            msg: 'model find error'
          },
          data: error
        });
      }
    } else {
      res.json({
        result: {
          code: 301,
          msg: 'miss id param'
        },
        data: {}
      });
    }
  }
  async getBlogListByTime(req, res, next) {
    console.log(`get on '/blog/getBlogListByTime'`);
    let pageIndex = parseInt(req.query.pageIndex) || 0;
    let pageSize = parseInt(req.query.pageSize) || 10;
    try {
      let bolgDocs = await blogModel.find({ status: 1 })
                                    .skip(pageIndex * pageSize)
                                    .limit(pageSize)
                                    .sort({ updateTime: -1 })
                                    .populate('user');
      res.json({
        result: {
          code: 200,
          msg: 'ok'
        },
        data: bolgDocs
      });
    } catch (error) {
      res.json({
        result: {
          code: 401,
          msg: 'model find error'
        },
        data: error
      });
    }
  }
}

export default new Blog();
