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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlogById = exports.listBlogs = void 0;
const connection_1 = require("../../backend/db/connection");
const connection_2 = require("../../backend/cache/connection");
const listBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Before Cache');
        const cache = yield connection_2.redisClient.get('allBlogs');
        console.log('After Cache');
        console.log(cache);
        if (cache) {
            console.log('Data found in cache. Returning cached data.');
            return res.json(JSON.parse(cache));
        }
    }
    catch (cacheError) {
        console.error("Error reading from cache:", cacheError);
    }
    try {
        console.log('Before Database Query');
        const [rows] = yield connection_1.db.query('SELECT * FROM blogs');
        console.log('After Database Query');
        console.log('Database query result:');
        console.log(rows);
        if (rows.length > 0) {
            connection_2.redisClient.set('allBlogs', JSON.stringify(rows)); // Set cache
            console.log('Data fetched from the database and cached.');
            return res.json(rows);
        }
        else {
            console.log('No data found in the database.');
            return res.status(404).json({ error: "No blogs found in the database" });
        }
    }
    catch (dbError) {
        console.error("Error fetching blogs from DB:", dbError);
        return res.status(500).json({ error: "Error fetching blogs from DB" });
    }
});
exports.listBlogs = listBlogs;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Logic to get a single blog by ID
});
exports.getBlogById = getBlogById;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }
    try {
        const result = yield connection_1.db.query('INSERT INTO blogs (title, content) VALUES (?, ?)', [title, content]);
        // Invalidate the cache as we have a new blog post
        connection_2.redisClient.del('allBlogs');
        const resultSetHeader = result[0];
        res.status(201).json({ id: resultSetHeader.insertId, title, content });
    }
    catch (error) {
        res.status(500).json({ error: "Error inserting new blog post" });
    }
});
exports.createBlog = createBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Logic to update a blog
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Logic to delete a blog
});
exports.deleteBlog = deleteBlog;
