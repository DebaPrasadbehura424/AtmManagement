package com.Atm.atmManage.vd;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class UpdateAccountDto {

    private String firstName;
    private String lastName;
    private String dob;
    private String email;
    private String phoneNumber;
    private String address;
    private String nomineeName;
    private String panNumber;
    private String aadhaarNumber;
    private String accountType;

}