import dotenv from 'dotenv';
import dynamoose from 'dynamoose';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

dotenv.config();

async function db_connection() {
  try {
    const ddb = new DynamoDB({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    console.log('Successfully connected to the DB.');
    dynamoose.aws.ddb.set(ddb);
    console.log('Successfully set DB.');
  } catch (error) {
    console.log(`Could not connect to DynamoDB ${process.env.AWS_REGION}.`, error);
    throw error;
  }
}

export default db_connection;
