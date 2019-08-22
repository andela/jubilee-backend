import db from '../models';
import env from '../config/env-config';

if (env.NODE_ENV !== 'production') {
  const syncOptions = env.NODE_ENV === 'test' ? { force: true } : {};
  db.sequelize.sync(syncOptions).then(() => {
    db.sequelize.close();
  });
}
