package com.Atm.atmManage.service;

import java.security.SecureRandom;

import org.springframework.stereotype.Service;

import com.Atm.atmManage.model.User;
import com.Atm.atmManage.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Save User
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Check Email Exists
    public boolean checkEmailExistOrNot(String email) {
        try {
            return userRepository.findByEmail(email).isPresent();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    // Generate 16-digit Account Number
    public String getAccountNumberFromService() {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < 16; i++) {
            sb.append(random.nextInt(10));
        }

        return sb.toString();
    }

    // Get User By AccountNumber
    public User getUserByAccountNumber(String accountNumber) {
        if (accountNumber == null || accountNumber.trim().isEmpty()) {
            return null;
        }

        System.out.println("Service: Searching for account -> [" + accountNumber.trim() + "]");

        User user = userRepository.findUserByAccountNumber(accountNumber.trim());

        if (user != null) {
            System.out.println("✅ User Found: " + user.getFirstName() + " " + user.getLastName());
        } else {
            System.out.println("❌ User NOT Found in DB");
        }

        return user;
    }

    // Get User By Account Number
    public User getUserExitOrNotByaccountNumber(String accountNumber) {
        try {
            return userRepository.findUserByAccountNumber(accountNumber.trim());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    // Verify PIN
    public boolean getUserExitOrNotByaccountNumberAndPin(User user, String pin) {

        return user.getPin().equals(pin);
    }

    // Get User By Email
    public User getUserExitOrNotByEmail(String email) {

        try {
            return userRepository.findByEmail(email.trim()).orElse(null);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public User getUserByAtmNumber(String atmNumber) {
        if (atmNumber == null || atmNumber.trim().isEmpty()) {
            return null;
        }

        System.out.println("Service: Searching for account -> [" + atmNumber.trim() + "]");

        User user = userRepository.findUserByAtmNumber(atmNumber.trim());

        if (user != null) {
            System.out.println("✅ User Found: " + user.getFirstName() + " " + user.getLastName());
        } else {
            System.out.println("❌ User NOT Found in DB");
        }

        return user;
    }

}