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
const dotenv_1 = __importDefault(require("dotenv"));
const promise_1 = require("mysql2/promise");
const blogSeedData_1 = require("./blogSeedData");
dotenv_1.default.config({ path: "../../../.env" });
const seedBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Before connecting....");
    console.log(process.env.MYSQL_HOST);
    // Create a separate database connection for seeding
    const seederConnection = yield (0, promise_1.createConnection)({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });
    console.log("Connected to the database for seeding.");
    // Insert the blog posts into the database
    for (let blog of blogSeedData_1.blogs) {
        const query = 'INSERT INTO blogs (title, content) VALUES (?, ?)';
        yield seederConnection.execute(query, [blog.title, blog.content]);
    }
    console.log('Seeding completed!');
    // Close the seeding connection
    yield seederConnection.end();
    console.log("Seeder database connection closed.");
});
seedBlogs().catch(err => {
    console.error('Error seeding the database:', err);
});
