import { Request, Response } from "express";
import { LoginService } from "../services/LoginUserService";
import { RegisterService } from "../services/RegisterUserService";
import { UpdateUserService } from "../services/UpdateUserService";

export class LoginUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const service = new LoginService();
        const login = await service.execute({ email, password });

        if (login instanceof Error) {
            return res.status(400).json({ error: login.message })
        }

        return res.json(login)
    }

}

export class RegisterUserController {
    async handle(req: Request, res: Response) {
        const { nome, cpf, creci, email, password, repassword } = req.body;

        const service = new RegisterService();
        const register = await service.execute({ nome, cpf, creci, email, password, repassword });

        if (register instanceof Error) {
            return res.status(400).json({ error: register.message })
        }

        return res.json(register)
    }
}

export class UpdateUserController {
    async handle(req: Request, res: Response) {
        const { id, nome, cpf, creci, email } = req.body;

        const service = new UpdateUserService();
        const result = await service.execute({ id, nome, cpf, creci, email });

        if (result instanceof Error) {
            return res.status(400).json({ error: result.message })
        }

        return res.json(result)
    }
}

