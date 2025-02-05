package com.Atm.atmManage.service;

import java.security.SecureRandom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Atm.atmManage.model.User;
import com.Atm.atmManage.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    

    public User CreateAtmCard(User user) {
        return userRepository.save(user);
    }

    public boolean checkEmailExistOrNot(String email) {
        try {
            User userById = userRepository.findUserByEmail(email);
            if (userById != null && userById.getEmail() != null) {
                return userById.getEmail().equalsIgnoreCase(email);
            }
            return false;
        } catch (Exception e) {
            System.err.println("Error checking email existence: " + e.getMessage());
            return false;
        }
    }

    // find user by aadharnumber
    public boolean checkAadharExistOrNot(String aadharNumber) {// 3456345
        try {
            User userIdUser = userRepository.findByAadharNumber(aadharNumber);// 34555
            return userIdUser != null;
        } catch (Exception e) {
            System.err.println("Error checking Aadhar existence: " + e);
            return false;
        }
    }

    // create random acc
    public String getAccountNumberFromService() {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(16);
        for (int i = 0; i < 16; i++) {
            sb.append(random.nextInt(10));
        }
        String accountNumber = sb.toString();
        return accountNumber;
    }

    public User getUserByAadharCard(String aadharNumber) {
        return userRepository.findByAadharNumber(aadharNumber);
    }

    public User getUserExitOrNotByaccountNumber(String accountNumber) {
        try {
            String trimmedAccountNumber = accountNumber.trim();
            return userRepository.getUserExitOrNotByaccountNumber(trimmedAccountNumber);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public boolean getUserExitOrNotByaccountNumberAndPin(User user, String pin) {
        return user.getPin().equals(pin);
    }

    public User getUserByToken(String token) {
        return userRepository.findByToken(token);
    }

    public User getUserExitOrNotByEmail(String email) {
        try {
            String trimmedemail = email.trim();
            return userRepository.getUserExitOrNotByEmail(trimmedemail);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
}
