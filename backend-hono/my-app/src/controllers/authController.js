import { sign } from 'hono/jwt';
import { ResponseDto } from '../dtos/responseDto';
import { TokenDto } from '../dtos/tokenDto';
import { UserDto } from '../dtos/userDto';

export const authController = {
  generateToken: async (c) => {
    try {
      // Token expiration time (5 minutes)
      const expiresIn = 60 * 5;
      
      const payload = {
        sub: 'user123',
        role: 'admin',
        exp: Math.floor(Date.now() / 1000) + expiresIn, 
      };
      
      const secret = 'mySecretKey';
      const token = await sign(payload, secret);
      
      // Create token DTO
      const tokenDto = new TokenDto(token, expiresIn);
      
      // Return success response with token data
      const response = ResponseDto.success(tokenDto, 'Token generated successfully');
      return c.json(response, response.statusCode);
    } catch (error) {
      // Return error response
      const response = ResponseDto.error('Error generating token', 500);
      return c.json(response, response.statusCode);
    }
  },
  
  getAbout: async (c) => {
    // Get user from context (if authenticated)
    const user = c.get('user');
    
    // Convert to DTO if user exists
    const data = user ? UserDto.fromPayload(user) : { message: 'Public about page' };
    
    // Return success response
    const response = ResponseDto.success(
      data, 
      user ? 'Protected about page accessed' : 'Public about page accessed'
    );
    return c.json(response, response.statusCode);
  },
  getContact: async (c) => {
    // Get user from context (if authenticated)
    const user = c.get('user');
    
    // Convert to DTO if user exists
    const data = user ? UserDto.fromPayload(user) : { message: 'Public Contact page' };
    
    // Return success response
    const response = ResponseDto.success(
      data, 
      user ? 'Protected contact page accessed' : 'Public contact page accessed'
    );
    return c.json(response, response.statusCode);
  }
};