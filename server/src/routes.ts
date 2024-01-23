import { Router } from "express";
import { LoginUserController, RegisterUserController, UpdateUserController} from "./api/controllers/UserController";


export const router = Router();

router.post('/login', new LoginUserController().handle);

router.post('/register', new RegisterUserController().handle);

router.put('/profile/update', new UpdateUserController().handle);
