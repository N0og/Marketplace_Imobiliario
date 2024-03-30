import { Router } from "express";
import UserController from "./api/controllers/UserController";
import PostsController from "./api/controllers/PostsController";
import { AuthTokenMiddleware } from "./api/middlewares/AuthTokenMiddleware";
import { upload } from "./api/config/multer";


export const router = Router();

//API - PRIVATE ROUTES

//USERS ENDPOINTS
router.post('/auth/login', new UserController().handleLogin); //Login de usuário, busca no banco de dados.

router.post('/auth/refresh-token', new AuthTokenMiddleware().handlerAuth)

router.post('/auth/register', new UserController().handleRegister); //Registro de usuário, acréscimo no banco de dados.

router.post('/auth/recovery', new UserController().handleRecoveryPassword); //Recupera a senha do usuário, usuário não logado.

router.put('/profile/update',  new AuthTokenMiddleware().handlerAuth, new UserController().handleUpdate); //Atualização de usuário profile

router.post('/profile/updatePassword', new AuthTokenMiddleware().handlerAuth, new UserController().handleUpdatePassword); //Atualização de senha do usuário logado.

router.post('/profile/:token/confirmedRecover', new AuthTokenMiddleware().handlerAuthRecovery ) //Retorna ao Front os dados do usuário e o Token para a tela de updatePassword

//POSTS ENDPOINTS
router.post('/posts/register', new AuthTokenMiddleware().handlerAuth, upload.array("files", 6), new PostsController().handleRegisterPost)

//API - PUBLIC ROUTES
router.get('/posts/getall', new PostsController().handlePublicPosts)

