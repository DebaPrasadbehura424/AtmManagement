package com.Atm.atmManage.service;

import com.Atm.atmManage.repository.UserRepository;

public class AccountService {

    public final UserRepository userRepository;

    public AccountService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }



}
