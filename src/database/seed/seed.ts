import { DataSource } from "typeorm";
import { UserEntity } from "../entity/User.entity";
import { UserRole } from "src/shared/enum/user.enum";

export async function UserSeed(dataSource:DataSource){
    const userRepo = dataSource.getRepository(UserEntity)
    const defaultAdminUser = userRepo.create({
        email: 'admin@gmail.com',
        password:'admin123',
        repeatPassword:'admin123',
        name: 'Admin',
        lastname: 'Admin',
        role: [UserRole.ADMIN]  
    })
    await defaultAdminUser.save()
} 