import express from 'express';
import userRoutes from './routes/users.js'
import centerRoutes from './routes/centers.js'
import errorMiddleware from './middlewares/errorMiddleware.js';

const PORT = 8000;

const app = express();

app.use("/api", userRoutes);
app.use("/api", centerRoutes);

app.use(errorMiddleware);

app.listen(PORT,  () => {
    console.log(`Server started at port ${PORT}`);
})