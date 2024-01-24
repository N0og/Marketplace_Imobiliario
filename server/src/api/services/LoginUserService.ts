import { userRepository } from "../repository/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {config as dotenvConfig} from 'dotenv';
dotenvConfig();

type LoginResponse = {
    user: {
        id: string;
        nome: string;
        email: string;
    };
    token: string;
};

type LoginRequest = {  
    email: string;
    password: string;
};

export class LoginService{
    async execute({ email, password }: LoginRequest): Promise<LoginResponse | Error> {
        const user = await userRepository.findOneBy({email});
        if (!user) {
            return new Error("Email ou senha incorretos.")
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch){
            return new Error("Email ou senha incorretos.")
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', { expiresIn: "1h",});

        const { password: _, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token,
        }
    }
}
