import { MariaDBDataSource } from "../../database/data-source";
import { UserTokens } from "../entities/UserTokens";

export const userTokensRepository = MariaDBDataSource.getRepository(UserTokens);