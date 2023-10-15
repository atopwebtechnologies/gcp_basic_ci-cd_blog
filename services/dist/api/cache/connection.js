"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisGet = exports.redisClient = void 0;
const redis_1 = require("redis");
const util_1 = require("util");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL
});
exports.redisClient
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
    console.log('Redis client disconnected');
});
// Initiate the connection
exports.redisClient.connect();
exports.redisGet = (0, util_1.promisify)(exports.redisClient.get).bind(exports.redisClient);
