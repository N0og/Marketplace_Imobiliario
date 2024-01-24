import jwt, { JsonWebTokenError } from "jsonwebtoken"
import { config as dotenvConfig } from 'dotenv'
import { userRepository } from "../repository/UserRepository";
dotenvConfig()

type JwtPayload = {
    id: string;
};

export class AuthTokenService {
    async execute(token: string) {
        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
            const user = await userRepository.findOneBy({ id });
            if (!user) {
                return new Error("Unauthorized");
            }
            const { password: _, ...loggedUser } = user
            return loggedUser;
        }
        catch (error) {
            return new Error("Unauthorized");
        }

    }
}