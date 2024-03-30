import { userRepository } from "../../repository/UserRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { config as dotenvConfig } from 'dotenv'

dotenvConfig();

type JwtPayload = {
    id: string
}

type updatePasswordRequest = {
    token: string,
    uuid: string,
    password: string,
    newPassword: string,
    reNewPassword: string
}

export class UpdatePasswordService {
    async execute({uuid, password, newPassword, reNewPassword}: updatePasswordRequest): Promise<object|Error> {

        const user = await userRepository.findOneBy({id:uuid});

        if (!user){
            return new Error("Usuário não cadastrado")
        };

        if (!(await bcrypt.compare(password, user.password))){
            return new Error("Senha atual incorreta")
        };

        if (!(newPassword === reNewPassword)){
            return new Error("A confirmação de nova senha não coincide")
        };

        if (await bcrypt.compare(newPassword, user.password)){
            return new Error("Senha já cadastrada.")
        };

        user.password = newPassword ? await bcrypt.hash(newPassword, 8) : user.password;

        const updateUser = await userRepository.save(user)

        if (!updateUser){
            return new Error(updateUser)
        }

        return {
            success:true
        }
    }
}