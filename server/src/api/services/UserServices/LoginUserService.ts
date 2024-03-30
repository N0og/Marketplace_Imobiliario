import { userRepository } from "../../repository/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {config as dotenvConfig} from 'dotenv';
dotenvConfig();

type ILoginRequest = {  
    email: string;
    password: string;
};

export class LoginService{
    async execute({ email, password }: ILoginRequest) {
        const user = await userRepository.findOneBy({email});
        if (!user) {
            return new Error("Email ou senha incorretos.")
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch){
            return new Error("Email ou senha incorretos.")
        }

        const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET || '', { expiresIn: "1h",});

        const refresh_token = jwt.sign({ sub: user.id }, process.env.JWT_REFRESH_SECRET || '', { expiresIn: "5h"})

        const userWithoutInfos = {
            id: user.id,
            email: user.email,
            nome: user.nome
        }

        return {
            user: userWithoutInfos,
            token,
            refresh_token
        }
    }
}
