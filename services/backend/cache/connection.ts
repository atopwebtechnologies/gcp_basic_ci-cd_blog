import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const redisClient = createClient({
    url: process.env.REDIS_HOST,
});

redisClient
    .on('connect', () => {
        console.log('Redis client connected');
    })
    .on('ready', () => {
        console.log('Redis client ready to receive commands');
    })
    .on('error', (err) => {
        console.error('Redis Client Error', err);
    })
    .on('end', () => {
        console.log('Redis client closed');
    })
    .on('reconnecting', () => {
        console.log('Redis client reconnecting');
    });

// Connect to Redis right after setting up event listeners
// Check this link if you wish to learn more about Immediately Invoked Function Expression (IIFE): https://developer.mozilla.org/en-US/docs/Glossary/IIFE

(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error('Error connecting to Redis:', err);
    }
})();
