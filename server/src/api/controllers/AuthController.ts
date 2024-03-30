import { Request, Response } from "express"

export class AuthController{
    async handleServices(req:Request, res:Response, serviceClass:any, srviceParams:any){

        try {
            const serviceInstance = new serviceClass();
            const result = await serviceInstance.execute(srviceParams);
        } catch (error) {
            return res.status(500).json({error})
        }

    }
}