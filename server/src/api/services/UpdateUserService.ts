import { userRepository } from "../repository/UserRepository";
import jwt from "jsonwebtoken"
import { Not } from "typeorm";
import { config as dotenvConfig } from 'dotenv'

dotenvConfig();

type JwtPayload = {
    id: string
}

type UpdateRequest = {
    token: string;
    uuid: string;
    nome: string;
    cpf: string;
    creci: string;
    email: string;

}

export class UpdateUserService {
    async execute({token, uuid, nome, cpf, creci, email }: UpdateRequest): Promise<object | Error> {

        const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
     
        if (!(id === uuid)){
            return new Error("Unauthorized")
        };

        const user = await userRepository.findOneBy({ id });

        if (!user) {
            return new Error("Usuário não cadastrado")
        }

        if (email && await userRepository.findOneBy({
            id: Not(user.id),    
            email: email, 
        })){
            return new Error("E-mail já cadastrado no sistema")
        }

        if (cpf && cpf.length > 11){
            return new Error("CPF Inválido.")
        }

        if (cpf && await userRepository.findOneBy({
            id: Not(user.id),    
            email: cpf, 
        })){
            return new Error("CPF já cadastrado no sistema")
        }

        if (creci && creci.length > 6) {
            return new Error("Formato Inválido.")
        }

        if (creci && await userRepository.findOneBy({
            creci: creci,
            id: Not(user.id),
        })){
            return new Error("CRECI já cadastrada no sistema.")
        }     

        user.nome = nome ? nome : user.nome;
        user.cpf = cpf ? cpf : user.cpf;
        user.creci = creci ? creci : user.creci;
        user.email = email ? email : user.email;

        const updateUser = await userRepository.save(user)

        if (!updateUser) {
            return new Error(updateUser)
        }
        return {
            success: true
        }
    }
}