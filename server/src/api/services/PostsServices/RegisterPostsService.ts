import multer from "multer"
import { imagesRepository } from "../../repository/ImagesRepository"
import { postsRepository } from "../../repository/PostsRepository"
import { userRepository } from "../../repository/UserRepository"


type IImage = {
    
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
    
}

type IPostRegister ={
        title: string,
        images: IImage[],
        desc: string,
        street: string, 
        number: string, 
        neighbourhood: string, 
        city: string, 
        state: string, 
        postal_code: string, 
        property_value: number,
        condo_fee: number,
        property_tax: number,
        area_property: number,
        qt_bedrooms: number,
        qt_parking_spaces: number,
        qt_living_rooms: number,
        qt_bathrooms: number,
        qt_kitchens: number,
        user_id: string

}

export class RegisterPostsService{
    async execute({
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
    }: IPostRegister){

        if (!user_id){
            return new Error("Usuário Inválido.")
        }

        if (!title){
            return new Error("Título Obrigatório.")
        }

        if (!neighbourhood){
            return new Error("Bairro Obrigatório.")
        }

        if (!city){
            return new Error("Cidade Obrigatória.")
        }

        if (!state){
            return new Error("Estado/UF Obrigatório.")
        }

        if (!postal_code){
            return new Error("CEP Obrigatório.")
        }

        if (!property_value){
            return new Error("Valor do imóvel Obrigatório.")
        }

        if (!qt_bedrooms || !qt_parking_spaces || !qt_living_rooms || !qt_bathrooms || !qt_kitchens){
            return new Error("Campos Inválidos.")
        }

        const user = await userRepository.findOneBy({id:user_id})

        if (!user){
            return new Error("Usuário Inválido.")
        }
        
        const inserResult = await postsRepository.insert({
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
            user: user
        })
        

        for(let image = 0; image < images.length; image++){
            const image_ = images[image]

            imagesRepository.insert({
                path: image_.path,
                filename: image_.filename,
                size: image_.size,
                originalname: image_.originalname,
                type: image_.mimetype,
                post: inserResult.identifiers[0].id
            })
            
        return{
            sucess: true
        }
        }
    }
}