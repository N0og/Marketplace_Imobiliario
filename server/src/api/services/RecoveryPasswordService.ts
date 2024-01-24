import { userRepository } from "../repository/UserRepository";
import jwt from "jsonwebtoken"
import { EmailService } from "./EmailService";

type RecoveryPasswordRequest = {
    email: string
}

export class RecoveryPasswordService{
    async execute({email}:RecoveryPasswordRequest){

        if (!email){
            return new Error("Informações Invalidas")
        }

        const user = await userRepository.findOneBy({email});
        if (!user){return new Error("Conta inexistente")}

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET || '', { expiresIn: "15m"})

        await EmailService.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Recuperação de Senha",
            text: `Link para recuperar a senha:\n\n${process.env.BASE_URL}/profile/${token}/confirmedRecover`,
        })   

    }
}