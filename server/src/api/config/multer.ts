import  multer  from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "uploads/images")
    },
    filename:(req, file, cb) => {
        const { user_id } = req.body
        if (file.mimetype.split('/')[0] !== 'image'){
            return new Error("Apenas imagens são permitidas.");
       
        }

        if (file.size > 6291456){
            return new Error("O tamanho da imagem excede o limite permitido. O tamanho máximo permitido para o upload de imagens é de 2 megabytes (MB).");
        }

        cb(null, `${user_id}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

export const upload = multer({storage});

