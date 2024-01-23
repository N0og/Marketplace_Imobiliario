import { User } from "../entities/User"; 
import { MariaDBDataSource } from "../../database/data-source";

export const userRepository = MariaDBDataSource.getRepository(User);

