import user from './user';
import blog from './blog';

export default app => {
  app.use('/user', user);
  app.use('/blog', blog);
};
