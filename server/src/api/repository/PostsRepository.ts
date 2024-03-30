import { Post } from "../entities/Post";
import { MariaDBDataSource } from "../../database/data-source";

export const postsRepository = MariaDBDataSource.getRepository(Post)