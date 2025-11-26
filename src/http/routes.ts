import type { Express } from 'express';
import { register } from './controllers/users/register';
import { findMany } from './controllers/users/find-many';
import { authenticate } from './controllers/users/authenticate';
import { verifyAdminRole } from './middlewares/verifyAdminRole';
import { findById } from './controllers/users/find-by-id';
import { findGraphicByUserId } from './controllers/graphics/find-by-user-id';

export async function appRoutes(app: Express) {
  app.post('/user', register);
  app.get('/user', findById);
  app.get('/users', verifyAdminRole, findMany);
  app.get('/graphic', findGraphicByUserId);
  app.post('/session', authenticate);
}
