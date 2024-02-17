import {User} from "../../data/dto/user";
import {UserEntity} from "../../data/entities/user.entity";

class UserToUserEntityMapper {
    public static userToUserEntity(user: User): UserEntity {
        const userEntity: UserEntity = new UserEntity();
        userEntity.firstname = user.firstname;
        userEntity.lastname = user.lastname;
        userEntity.mailAddress = user.mailAddress;
        userEntity.password = user.password;
        userEntity.username = user.username;
        return userEntity;
    }
}

export default UserToUserEntityMapper;
