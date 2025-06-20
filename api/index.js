import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js'
import centerRoutes from './routes/centers.js'
import errorMiddleware from './middlewares/errorMiddleware.js';

const PORT = 8000;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", userRoutes);
app.use("/api", centerRoutes);

// 404 handler
app.use((req, _, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})