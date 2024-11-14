import { Router } from 'express'
import {getAllUsers , getUserById , deleteUser, createUser} from '../controllers/user.js'

const userRouter = Router()

userRouter.post("/register", createUser)
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);
userRouter.delete("/users/:id", deleteUser);
export default userRouter