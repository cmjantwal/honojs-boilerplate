// config.ts
import 'dotenv/config'; // Optionally load environment variables here

interface Config {
  jwtSecret: string;
  // Add other configuration properties here
}

const config: Config = {
  jwtSecret: process.env.JWT_SECRET || 'your-default-secret-key', // Fallback if not in env
  // Add other configuration here, e.g., database URLs
};

export default config;