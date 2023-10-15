import dotenv from 'dotenv';
import { createConnection, Connection } from 'mysql2/promise';
import { blogs } from './blogSeedData';

dotenv.config({ path: "../../../.env" });

const seedBlogs = async () => {
    console.log("Before connecting....")
    console.log(process.env.MYSQL_HOST)

    // Create a separate database connection for seeding
    const seederConnection: Connection = await createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });

    console.log("Connected to the database for seeding.");

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
