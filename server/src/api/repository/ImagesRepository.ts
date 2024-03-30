import { Images } from "../entities/Images";
import { MariaDBDataSource } from "../../database/data-source";

export const imagesRepository = MariaDBDataSource.getRepository(Images);