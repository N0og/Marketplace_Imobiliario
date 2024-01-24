import { NextFunction, Request, Response } from "express";
import { AuthTokenService } from "../services/AuthTokenService";

export class AuthTokenController {
    async handlerAuth(req: Request, res:Response, next: NextFunction){
        const {authorization} = req.headers;
        if(!authorization){
            return res.status(401).json({error: "Unauthorized"});
        };
        const token = authorization.split(" ")[1];

        const service = new AuthTokenService();
        const result = await service.execute(token);
        if (result instanceof Error){
            return res.status(401).json({error: result.message});
        }
        next()
    }

    async handlerAuthRecovery(req: Request, res:Response){
       
        const { token } = req.params;
        if(!token){
            return res.status(401).json({error: "Unauthorized"});
        };

        const service = new AuthTokenService();
        const result = await service.execute(token);
        if (result instanceof Error){
            return res.status(401).json({error: result.message});
        }
        return res.status(200).json({result, token})
    }

}