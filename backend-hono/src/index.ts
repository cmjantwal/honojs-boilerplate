import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import { authMiddleware } from './middleware/authMiddleware.js';
import { authController } from './controllers/authController.js';

const app = new Hono()

// Public routes
app.get('/auth/token', authController.generateToken);
app.get('/about', authController.getAbout);

// Protected routes using a group
const auth = new Hono();
auth.use('*', authMiddleware);
auth.get('/contact', authController.getContact);
//auth.get('/notabout', authController.getAbout);


// Mount the auth group to the main app
app.route('/', auth);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
