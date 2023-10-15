import { Request, Response } from 'express';
import { db } from '../../backend/db/connection';
import { redisClient } from '../../backend/cache/connection';
import { Blog, BlogInput } from '../../backend/models/Blog';
import { ResultSetHeader } from 'mysql2';


export const listBlogs = async (req: Request, res: Response) => {
    
    try {
        console.log('Before Cache');
        const cache = await redisClient.get('allBlogs');
        console.log('After Cache');
        console.log(cache);

        if (cache) {
            console.log('Data found in cache. Returning cached data.');
            return res.json(JSON.parse(cache));
        }
    } catch (cacheError) {
        console.error("Error reading from cache:", cacheError);
    }

    try {
        console.log('Before Database Query');
        const [rows] = await db.query<Blog[]>('SELECT * FROM blogs');
        console.log('After Database Query');
        console.log('Database query result:');
        console.log(rows);

        if (rows.length > 0) {
            redisClient.set('allBlogs', JSON.stringify(rows)); // Set cache
            console.log('Data fetched from the database and cached.');
            return res.json(rows);
        } else {
            console.log('No data found in the database.');
            return res.status(404).json({ error: "No blogs found in the database" });
        }
    } catch (dbError) {
        console.error("Error fetching blogs from DB:", dbError);
        return res.status(500).json({ error: "Error fetching blogs from DB" });
    }
};


export const getBlogById = async (req: Request, res: Response) => {
    // Logic to get a single blog by ID
};

export const createBlog = async (req: Request, res: Response) => {
    const { title, content }: BlogInput = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }

    try {
        const result = await db.query(
            'INSERT INTO blogs (title, content) VALUES (?, ?)',
            [title, content]
        );

        // Invalidate the cache as we have a new blog post
        redisClient.del('allBlogs');

        const resultSetHeader = result[0] as ResultSetHeader;

        res.status(201).json({ id: resultSetHeader.insertId, title, content });


    } catch (error) {
        res.status(500).json({ error: "Error inserting new blog post" });
    }
};

export const updateBlog = async (req: Request, res: Response) => {
    // Logic to update a blog
};

export const deleteBlog = async (req: Request, res: Response) => {
    // Logic to delete a blog
};
