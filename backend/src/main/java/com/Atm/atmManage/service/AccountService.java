package com.Atm.atmManage.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.Atm.atmManage.model.Transaction;
import com.Atm.atmManage.model.User;
import com.Atm.atmManage.repository.UserRepository;
import com.Atm.atmManage.vd.TrasactionDto;
import com.Atm.atmManage.vd.UpdateAccountDto;

@Service
public class AccountService {

    private final UserRepository userRepository;

    public AccountService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ===========================
    // Balance Enquiry
    // ===========================

    public Double balanceEnquiry(String accountNumber) {

        User user = userRepository.findUserByAccountNumber(accountNumber);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return user.getBalance();
    }

    // ===========================
    // Deposit Money
    // ===========================

    public Double deposit(TrasactionDto dto) {

        User user = userRepository.findUserByAccountNumber(dto.getAccountNumber());

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        List<Transaction> transactionList = user.getTransactionList();

        if (transactionList == null) {
            transactionList = new ArrayList<>();
        }

        double amount = dto.getTransactionAmount();

        user.setBalance(user.getBalance() + amount);

        transactionList.add(
                new Transaction(
                        "Deposit",
                        dto.getMode(),
                        amount,
                        LocalDateTime.now()));

        user.setTransactionList(transactionList);

        userRepository.save(user);

        return user.getBalance();
    }

    // ===========================
    // Withdraw Money
    // ===========================

    public Double withdraw(String accountNumber,
            Double amount,
            String mode) {

        User user = userRepository.findUserByAccountNumber(accountNumber);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (amount <= 0) {
            throw new RuntimeException("Invalid amount");
        }

        if (amount % 100 != 0) {
            throw new RuntimeException("Amount should be multiple of 100");
        }

        if (amount > user.getBalance()) {
            throw new RuntimeException("Insufficient Balance");
        }

        List<Transaction> transactionList = user.getTransactionList();

        if (transactionList == null) {
            transactionList = new ArrayList<>();
        }

        user.setBalance(user.getBalance() - amount);

        transactionList.add(
                new Transaction(
                        "Withdraw",
                        mode,
                        amount,
                        LocalDateTime.now()));

        user.setTransactionList(transactionList);

        userRepository.save(user);

        return user.getBalance();
    }

    // ===========================
    // Update ATM PIN
    // ===========================

    public String updateAtmPin(String atmNumber,
            String newPin) {

        User user = userRepository.findByAtmNumber(atmNumber);

        if (user == null) {
            throw new RuntimeException("ATM Card not found");
        }

        user.setPin(newPin);

        userRepository.save(user);

        return "ATM PIN Updated Successfully";
    }

    // ===========================
    // Update Account Details
    // ===========================

    public User updateAccount(String accountNumber,
            UpdateAccountDto dto) {

        User user = userRepository.findUserByAccountNumber(accountNumber);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (dto.getFirstName() != null)
            user.setFirstName(dto.getFirstName());

        if (dto.getLastName() != null)
            user.setLastName(dto.getLastName());

        if (dto.getEmail() != null)
            user.setEmail(dto.getEmail());

        if (dto.getPhoneNumber() != null)
            user.setPhoneNumber(dto.getPhoneNumber());

        if (dto.getAddress() != null)
            user.setAddress(dto.getAddress());

        if (dto.getNomineeName() != null)
            user.setNomineeName(dto.getNomineeName());

        userRepository.save(user);

        return user;
    }

    // ===========================
    // Delete ATM
    // ===========================

    public String deleteAtm(String atmNumber) {

        User user = userRepository.findByAtmNumber(atmNumber);

        if (user == null) {
            throw new RuntimeException("ATM Card not found");
        }

        user.setAtmNumber(null);
        user.setPin(null);

        userRepository.save(user);

        return "ATM Deleted Successfully";
    }

    // ===========================
    // Delete Account
    // ===========================

    public String deleteAccount(String accountNumber) {

        User user = userRepository.findUserByAccountNumber(accountNumber);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        userRepository.delete(user);

        return "Account Deleted Successfully";
    }

}