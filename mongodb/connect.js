import mongoose from 'mongoose'

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

const uri = 'mongodb://localhost:27017/personalsite';

mongoose.connect(uri, {}).then(
  () => console.log('数据库连接成功'),
  err => console.log('数据库链接失败: ' + err)
);
