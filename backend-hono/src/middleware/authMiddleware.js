import { verify } from 'hono/jwt';
import { ResponseDto } from '../dtos/responseDto';
import config from '../config/config'; // Assuming you have a config.ts file

export const authMiddleware = async (c, next) => {
  try {
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.split(' ')[1];
    
    if (!token) {
      const response = ResponseDto.error('Authentication required', 401);
      return c.json(response, response.statusCode);
    }
    
    const secret = config.jwtSecret; // Accessing from the config object
    if (!secret) {
      console.error('JWT secret not configured in config file!');
      const response = ResponseDto.error('Server configuration error', 500);
      return c.json(response, response.statusCode);
    }

    const decoded = await verify(token, secret);
    
    // Add user info to the context
    c.set('user', decoded);
    
    await next();
  } catch (error) {
    const response = ResponseDto.error('Invalid or expired token', 401);
    return c.json(response, response.statusCode);
  }
};