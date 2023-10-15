"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_HOST,
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
    console.log('Redis client closed');
})
    .on('reconnecting', () => {
    console.log('Redis client reconnecting');
});
// Connect to Redis right after setting up event listeners
// Check this link if you wish to learn more about Immediately Invoked Function Expression (IIFE): https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.redisClient.connect();
    }
    catch (err) {
        console.error('Error connecting to Redis:', err);
    }
}))();
