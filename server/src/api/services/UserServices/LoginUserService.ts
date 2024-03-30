import { userRepository } from "../../repository/UserRepository";
import { userTokensRepository } from "../../repository/UserTokenRepository";
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

        const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET || '', { expiresIn: parseInt(process.env.JWT_EXPIRATION!)});

        const refresh_token = jwt.sign({ sub: user.id }, process.env.JWT_REFRESH_SECRET || '', { expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRATION!)})

        const expirationDate = new Date(Date.now() + parseInt(process.env.JWT_REFRESH_EXPIRATION!) * 1000);



        if (!await userTokensRepository.findOneBy({user_id:user.id})){
            await userTokensRepository.insert({
                refresh_token: refresh_token,
                user_id: user.id,
                expires_date: expirationDate
            })
        }

        else{
            await userTokensRepository.delete({user_id:user.id })
            await userTokensRepository.insert({
                    refresh_token: refresh_token,
                    user_id: user.id,
                    expires_date: expirationDate
                })
        }

        const user_token = await userTokensRepository.findOneBy({user_id:user.id})

        const userWithoutInfos = {
            id: user.id,
            email: user.email,
            nome: user.nome
        }

        return {
            user: userWithoutInfos,
            token,
            refresh_token: user_token?.id
        }
    }
}
