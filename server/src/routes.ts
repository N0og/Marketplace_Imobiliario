import { Router } from "express";
import UserController from "./api/controllers/UserController";
import { AuthTokenController } from "./api/controllers/AuthTokenController";


export const router = Router();

//API - PRIVATE ROUTES
router.post('/auth/login', new UserController().handleLogin); //Login de usuário, busca no banco de dados.

router.post('/auth/register', new UserController().handleRegister); //Registro de usuário, acréscimo no banco de dados.

router.post('/auth/recovery', new UserController().handleRecoveryPassword); //Recupera a senha do usuário, usuário não logado.

router.put('/profile/update',  new AuthTokenController().handlerAuth, new UserController().handleUpdate); //Atualização de usuário profile

router.post('/profile/updatePassword', new AuthTokenController().handlerAuth, new UserController().handleUpdatePassword); //Atualização de senha do usuário logado.

router.post('/profile/:token/confirmedRecover', new AuthTokenController().handlerAuthRecovery) //Retorna ao Front os dados do usuário e o Token para a tela de updatePassword