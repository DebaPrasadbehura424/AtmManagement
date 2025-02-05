package com.Atm.atmManage.model;

import org.springframework.lang.NonNull;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(value = "atmUser")
@Data
@NoArgsConstructor
public class User {

    @Id
    private ObjectId id;

    @NonNull
    private String firstName;

    @NonNull
    private String lastName;

    @NonNull
    @Indexed(unique = true)
    private String accountNumber;

    @NonNull
    private String pin;

    @NonNull
    private String address;

    @NonNull
    private String phoneNumber;

    @NonNull
    @Indexed(unique = true)
    private String aadharNumber;

    @NonNull
    @Indexed(unique = true)
    private String email;

    @NonNull
    private double balance;

    @NonNull
    private LocalDateTime creationDateTime;

    @NonNull
    private String token;

    private List<Transaction> trsanctionList = new ArrayList<>();

}
