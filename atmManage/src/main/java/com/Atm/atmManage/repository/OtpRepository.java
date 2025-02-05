package com.Atm.atmManage.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.Atm.atmManage.model.Otp;

public interface OtpRepository extends MongoRepository<Otp, ObjectId> {

   
    Otp findByOtp(String otp);
}
