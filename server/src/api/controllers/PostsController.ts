import { Request, Response } from "express";
import { PublicPostsService } from "../services/PostsServices/PublicPostsService";
import { RegisterPostsService } from "../services/PostsServices/RegisterPostsService";

export default class PostsController {

    async handleServiceRequest(req: Request, res: Response, serviceClass: any, serviceParams: any) {
        try {
            const serviceInstace = new serviceClass();
            const result = await serviceInstace.execute(serviceParams)

            if (result instanceof Error) {
                return res.status(400).json({ error: result.message })
            }

            return res.json(result)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: "Erro Interno do Servidor." })
        }
    }

    handlePublicPosts = async (req:Request, res: Response) => {
        await this.handleServiceRequest(req, res, PublicPostsService, {})
    }

    handleRegisterPost = async (req:Request, res: Response) => {
        
        const {
            title,
            desc,
            street, 
            number, 
            neighbourhood, 
            city, 
            state, 
            postal_code, 
            property_value,
            condo_fee,
            property_tax,
            area_property,
            qt_bedrooms,
            qt_parking_spaces,
            qt_living_rooms,
            qt_bathrooms,
            qt_kitchens,
            user_id
        } = req.body

        const images = req.files

        await this.handleServiceRequest(
            req, res, RegisterPostsService, {
                images,
                title,
                desc,
                street, 
                number, 
                neighbourhood, 
                city, 
                state, 
                postal_code, 
                property_value,
                condo_fee,
                property_tax,
                area_property,
                qt_bedrooms,
                qt_parking_spaces,
                qt_living_rooms,
                qt_bathrooms,
                qt_kitchens,
                user_id
            })
    }
}