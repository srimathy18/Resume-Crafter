import express from 'express';
import { registerUser, loginUser, getDashboard ,getUserProfile} from '../controllers/usercontroller.js';
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get("/dashboard", userAuth, getDashboard);
userRouter.get('/profile', userAuth, getUserProfile);

export default userRouter;