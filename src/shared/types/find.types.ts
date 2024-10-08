import { UserEntity } from "src/database/entity/User.entity";
import { FindOptionsSelect, FindOptionsWhere } from "typeorm";

export interface FindUserParams<T>  {
    where?:FindOptionsWhere<T> | FindOptionsWhere<T>[];
    select?:FindOptionsSelect<T>;
    relations?:string[];
    limit?:number;
    page?:number;

}
export type findOnePrams<T> = Omit<FindUserParams<T>,'limit | page'> 