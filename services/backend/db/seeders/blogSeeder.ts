import dotenv from 'dotenv';
import { createConnection, Connection } from 'mysql2/promise';
import { blogs } from './blogSeedData';

dotenv.config();

const seedBlogs = async () => {
    console.log("Before connecting....");
    console.log(process.env.MYSQL_HOST);

    // Create a separate database connection for seeding
    const seederConnection: Connection = await createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: Number(process.env.MYSQL_PORT) // If you have a specific port, uncomment this line
    });

    console.log("Connected to the database for seeding.");

    // Ensure the blogs table exists
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS blogs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    await seederConnection.execute(createTableQuery);

    // Insert the blog posts into the database
    for (let blog of blogs) {
        const query = 'INSERT INTO blogs (title, content) VALUES (?, ?)';
        await seederConnection.execute(query, [blog.title, blog.content]);
    }

    console.log('Seeding completed!');

    // Close the seeding connection
    await seederConnection.end();
    console.log("Seeder database connection closed.");
};

seedBlogs().catch(err => {
    console.error('Error seeding the database:', err);
});
