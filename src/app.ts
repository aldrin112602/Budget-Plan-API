
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// API endpoints ( Port 8000 || 3000 )
// http://localhost:8000/api/auth/login
// http://localhost:8000/api/auth/register
// http://localhost:8000/api/user/profile

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

export default app;
