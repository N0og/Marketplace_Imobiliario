import { Request, Response } from "express";
import { LoginService } from "../services/UserServices/LoginUserService";
import { RegisterService } from "../services/UserServices/RegisterUserService";
import { UpdateUserService } from "../services/UserServices/UpdateUserService";
import { UpdatePasswordService } from "../services/UserServices/UpdatePasswordService";
import { RecoveryPasswordService } from "../services/UserServices/RecoveryPasswordService";

export default class UserController {
    async handleServiceRequest(req: Request, res: Response, serviceClass: any, serviceParams: any) {
        try {
            const serviceInstance = new serviceClass();
            const result = await serviceInstance.execute(serviceParams);

            if (result instanceof Error) {
                return res.status(400).json({ error: result.message })
            }

            return res.json(result)
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro Interno do Servidor." });
        }
    }

     handleLogin = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        await this.handleServiceRequest(req, res, LoginService, { email, password });
    }

    handleRegister = async (req: Request, res: Response) => {
        const { nome, cpf, creci, email, telefone, password, repassword } = req.body;
        await this.handleServiceRequest(req, res, RegisterService, { nome, cpf, creci, email, telefone, password, repassword });
    }

    handleUpdate = async (req: Request, res: Response) => {
        const { uuid, nome, telefone, cpf, creci, email } = req.body;
        await this.handleServiceRequest(req, res, UpdateUserService, { uuid, nome, telefone, cpf, creci, email });
    }

    handleUpdatePassword = async (req: Request, res: Response) => {
        const {uuid, password, newPassword, reNewPassword} = req.body;

        await this.handleServiceRequest(req, res, UpdatePasswordService, { uuid, password, newPassword, reNewPassword});
    }

    handleRecoveryPassword = async (req: Request, res: Response) => {
        const {email} = req.body;
        await this.handleServiceRequest(req, res, RecoveryPasswordService, {email});
    }
}
