import { createClient } from 'redis';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const client = createClient({
    url: process.env.REDIS_URI
});

client.on('error', (err) => console.error('Redis Client Error', err));

client.connect()
    .then(() => {
        console.log('Connected to Redis');
    })
    .catch((err) => {
        console.error('Redis Connection Error', err);
    });

export default client;
