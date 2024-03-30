import { postsRepository } from "../../repository/PostsRepository";

export class PublicPostsService{
    async execute(){
        return await postsRepository.find()
    }
}