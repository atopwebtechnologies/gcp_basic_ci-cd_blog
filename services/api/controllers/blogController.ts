import { Request, Response } from "express";
import { db } from "../../backend/db/connection";
import { redisClient } from "../../backend/cache/connection";
import { Blog, BlogInput } from "../../backend/models/Blog";
import { ResultSetHeader } from "mysql2";

export const listBlogs = async (req: Request, res: Response) => {
  try {
    console.log("Before Cache");
    const cache = await redisClient.get("allBlogs");
    console.log("After Cache");
    console.log(cache);

    if (cache) {
      console.log("Data found in cache. Returning cached data.");
      return res.json(JSON.parse(cache));
    }
  } catch (cacheError) {
    console.error("Error reading from cache:", cacheError);
  }

  try {
    console.log("Before Database Query");
    const [rows] = await db.query<Blog[]>("SELECT * FROM blogs");
    console.log("After Database Query");
    console.log("Database query result:");
    console.log(rows);

    if (rows.length > 0) {
      redisClient.set("allBlogs", JSON.stringify(rows)); // Set cache
      console.log("Data fetched from the database and cached.");
      return res.json(rows);
    } else {
      console.log("No data found in the database.");
      return res.status(404).json({ error: "No blogs found in the database" });
    }
  } catch (dbError) {
    console.error("Error fetching blogs from DB:", dbError);
    return res.status(500).json({ error: "Error fetching blogs from DB" });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
    // Logic to get a single blog by ID
    try {
        const { id } = req.params;

        // Check if the 'id' parameter is a valid number
        if (isNaN(Number(id))) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        // You would typically use a database query to fetch the blog post by its ID
        // Replace the following line with your actual database query
        const [blog] = await db.query<Blog[]>("SELECT * FROM blogs WHERE id = ?", [id]);

        // console.log("blog: ", blog[0])
        // Check if the blog post was found
        if (blog[0] === undefined) {
            return res.status(404).json({ message: "Blog post not found" });
        }

        // If the blog post was found, return it as a JSON response
        return res.status(200).json({ blog: blog[0] });
    } catch (error) {
        return res.status(500).json({ error: "Error fetching the blog post" });
    }
};

export const createBlog = async (req: Request, res: Response) => {
  const { title, content }: BlogInput = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const result = await db.query(
      "INSERT INTO blogs (title, content) VALUES (?, ?)",
      [title, content]
    );

    // Invalidate the cache as we have a new blog post
    redisClient.del("allBlogs");

    const resultSetHeader = result[0] as ResultSetHeader;

    res.status(201).json({ id: resultSetHeader.insertId, title, content });
  } catch (error) {
    res.status(500).json({ error: "Error inserting new blog post" });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  // Logic to update a blog
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(403).json({ message: "Invalid Id" });
  }

  // Extract title and content from the request body, if provided
  const { title, content } = req.body;

  // Initialize an array to store the SET clauses
  const setClauses = [];

  // Initialize an array to store the values that will be bound to the query
  const values = [];

  // Check if title is provided and add it to the SET clause
  if (title !== undefined) {
    setClauses.push("title = ?");
    values.push(title);
  }

  // Check if content is provided and add it to the SET clause
  if (content !== undefined) {
    setClauses.push("content = ?");
    values.push(content);
  }

  if (setClauses.length === 0) {
    // Handle the case where neither title nor content is provided
    return res
      .status(400)
      .json({
        message: "You must provide 'title' and/or 'content' to update.",
      });
  }

  // Build the SQL query dynamically
  const setClause = setClauses.join(", "); // Join the SET clauses with commas
  const query = `UPDATE blogs SET ${setClause} WHERE id = ?`;
  values.push(id); // Add the 'id' value to the bound values

  try {
    const result = await db.query(query, values);

    // Invalidate the cache as we have a new blog post
    redisClient.del("allBlogs");
    return res.status(200).json({ message: "Blog post updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error updating the blog post" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  // Logic to delete a blog
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(403).json({ message: "Invalid Id" });
  }
  try {
    const result = await db.query("DELETE FROM blogs WHERE  id = ?", [id]);
    if ((result[0] as ResultSetHeader).affectedRows !== 1) {
      return res
        .status(200)
        .json({ message: `Blog post ${id} does not exist` });
    }

    // Invalidate the cache as we have a new blog post
    redisClient.del("allBlogs");

    return res.status(200).json({ message: `Blog post ${id} deleted` });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting new blog post" });
  }
};
