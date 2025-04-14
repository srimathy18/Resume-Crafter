import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js'


dotenv.config(); 

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

const startServer = async () => {
  await connectDB();
  app.use('/api/user', userRouter);
  app.use('/api/resumes', resumeRoutes);
  
  app.get('/', (req, res) => res.send("API Working"));

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
