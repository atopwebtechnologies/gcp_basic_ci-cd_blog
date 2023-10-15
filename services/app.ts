import express from 'express';
import blogRoutes from './api/routers/blogRoutes';

const app = express();
const PORT = 3000;


app.use(express.json());
app.use('/api/v1/blogs', blogRoutes);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

export default app;
