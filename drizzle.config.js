import 'dotenv/config';

export default {
  schema: './src/models/schema.js',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL + '?sslmode=require',
  },
};
