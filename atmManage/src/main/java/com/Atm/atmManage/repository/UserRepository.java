package com.Atm.atmManage.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.Atm.atmManage.model.User;

public interface UserRepository extends MongoRepository<User, ObjectId> {

    User findUserByEmail(String email);

    User findByAadharNumber(String aadharNumber);

    User findByToken(String token);

    User getUserExitOrNotByEmail(String trimmedemail);

    User getUserExitOrNotByaccountNumber(String trimmedAccountNumber);

}
