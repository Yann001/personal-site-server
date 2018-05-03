import mongoose from 'mongoose';
import config from '../config/config';

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

mongoose.connect(config.mongodbUri, {}).then(
  () => console.log('mongodb connect success...'),
  err => console.log('mongodb connect error: ' + err)
);

export default mongoose.connection;
