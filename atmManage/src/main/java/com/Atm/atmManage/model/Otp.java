package com.Atm.atmManage.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(value = "OTPS")
@Data
public class Otp {

    @Id
    private ObjectId id;

    private String otp;

}
