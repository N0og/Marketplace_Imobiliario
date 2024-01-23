import { userRepository } from "../repository/UserRepository";
import bcrypt from "bcrypt";


type RegisterRequest = {
    nome: string;
    cpf: string;
    creci: string;
    email: string;
    password: string;
    repassword: string;
}

export class RegisterService{
    async execute({nome, cpf, creci, email, password, repassword}: RegisterRequest): Promise<object | Error>{

        if (await userRepository.findOneBy({email})) {
            return new Error("e-mail já cadastrado no sistema.")
        }

        if (await userRepository.findOneBy({creci})) {
            return new Error("CRECI já cadastrada no sistema.")
        }

        if (await userRepository.findOneBy({cpf})) {
            return new Error("CPF já cadastrada no sistema.")
        }

        if (!(password === repassword)){
            return new Error("As senhas não coincidem.")
        }
        
        if (creci && creci.length > 6){
            return new Error("Formato Inválido.")
        }

        if (cpf && cpf.length > 11){
            return new Error("CPF Inválido.")
        }

        const password_hash = await bcrypt.hash(password, 8);

        const register = await userRepository.insert({
            nome: nome,
            cpf: cpf,
            creci: creci,
            email: email,
            password: password_hash})
        
        if (!register){
            return new Error(register)
        }
        return{
            success: true
        }
    }
}