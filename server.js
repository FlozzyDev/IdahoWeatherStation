import dotenv from 'dotenv';
import db_connection from './db/connection.js';
import express from 'express';
import app from './app.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

async function startServer() {
  await db_connection();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`AWS region for DB: ${process.env.AWS_REGION}`);
  });
}

startServer().catch(console.error);
