import { userRepository } from "../../repository/UserRepository";
import { Not } from "typeorm";


type UpdateRequest = {
    token: string;
    uuid: string;
    nome: string;
    cpf: string;
    creci: string;
    email: string;

}

export class UpdateUserService {
    async execute({ uuid, nome, cpf, creci, email }: UpdateRequest): Promise<object | Error> {


        const user = await userRepository.findOneBy({ id: uuid });

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
            cpf: cpf, 
        })){
            return new Error("CPF já cadastrado no sistema")
        }

        if (creci && creci.length > 6) {
            return new Error("Formato Inválido.")
        }

        if (creci && await userRepository.findOneBy({
            id: Not(user.id),
            creci: creci,   
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