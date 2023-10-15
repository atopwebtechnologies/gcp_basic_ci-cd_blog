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
const connection_1 = require("../../../backend/db/connection");
const connection_2 = require("../../../backend/cache/connection");
const listBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check cache first
    try {
        const cache = yield (0, connection_2.redisGet)('allBlogs');
        if (cache) {
            return res.json(JSON.parse(cache));
        }
    }
    catch (error) {
        console.error("Error reading from cache", error);
    }
    // If not in cache, get from DB
    try {
        const [rows] = yield connection_1.db.query('SELECT * FROM blogs');
        connection_2.redisClient.set('allBlogs', JSON.stringify(rows)); // Set cache
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching blogs from DB" });
    }
});
exports.listBlogs = listBlogs;
// Placeholder implementations for other routes
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Logic to get a single blog by ID
});
exports.getBlogById = getBlogById;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Logic to create a new blog
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
