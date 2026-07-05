package com.Atm.atmManage.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.Atm.atmManage.model.Transaction;
import com.Atm.atmManage.model.User;
import com.Atm.atmManage.repository.TrasanctionRepository;
import com.Atm.atmManage.repository.UserRepository;
import com.Atm.atmManage.vd.TrasactionDto;
import com.Atm.atmManage.vd.UpdateAccountDto;

@Service
public class AccountService {

    private final UserRepository userRepository;
    private final TrasanctionRepository transactionRepository;

    public AccountService(UserRepository userRepository, TrasanctionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
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

    public ResponseEntity<?> transaction(String accountNumber,
            Double amount,
            String mode,
            String operation) {
        System.out.println(operation);

        try {

            User user = userRepository.findUserByAccountNumber(accountNumber);

            if (user == null) {
                return new ResponseEntity<>("Account not found.", HttpStatus.NOT_FOUND);
            }

            if (amount <= 0) {
                return new ResponseEntity<>("Invalid amount.", HttpStatus.NOT_FOUND);
            }

            double currentBalance = user.getBalance();

            if (operation.equalsIgnoreCase("withdraw")) {

                if (currentBalance < amount) {
                    return new ResponseEntity<>("Insufficient balance.", HttpStatus.NOT_FOUND);
                }

                currentBalance -= amount;
                user.setBalance(currentBalance);

            } else if (operation.equalsIgnoreCase("deposit")) {

                currentBalance += amount;
                user.setBalance(currentBalance);

            } else {
                return new ResponseEntity<>("Invalid operation.", HttpStatus.NOT_FOUND);
            }

            // Create Transaction
            Transaction transaction = new Transaction();
            transaction.setTransactionType(operation);
            transaction.setMode(mode);
            transaction.setTransactionAmount(amount);
            transaction.setTransactionDate(LocalDateTime.now());
            transaction.setUser(user);

            // Add transaction to user's list
            user.getTransactionList().add(transaction);

            // Save
            userRepository.save(user);
            transactionRepository.save(transaction);

            String answer = operation.substring(0, 1).toUpperCase()
                    + operation.substring(1).toLowerCase()
                    + " successful. Current Balance: ₹" + currentBalance;
            return new ResponseEntity<>(answer, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Transaction failed : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> atmTransaction(String atmNumber,
            Double amount,
            String mode,
            String operation) {

        try {

            User user = userRepository.findUserByAtmNumber(atmNumber);

            if (user == null) {
                return new ResponseEntity<>("ATM card not found.", HttpStatus.NOT_FOUND);
            }

            if (amount == null || amount <= 0) {
                return new ResponseEntity<>("Invalid amount.", HttpStatus.BAD_REQUEST);
            }

            double currentBalance = user.getBalance();

            if (operation.equalsIgnoreCase("withdraw")) {

                if (currentBalance < amount) {
                    return new ResponseEntity<>("Insufficient balance.", HttpStatus.BAD_REQUEST);
                }

                currentBalance -= amount;

            } else if (operation.equalsIgnoreCase("deposit")) {

                currentBalance += amount;

            } else {

                return new ResponseEntity<>("Invalid operation.", HttpStatus.BAD_REQUEST);
            }

            user.setBalance(currentBalance);

            Transaction transaction = new Transaction();
            transaction.setTransactionType(operation);
            transaction.setMode(mode);
            transaction.setTransactionAmount(amount);
            transaction.setTransactionDate(LocalDateTime.now());
            transaction.setUser(user);

            user.getTransactionList().add(transaction);

            userRepository.save(user);

            String message = operation.substring(0, 1).toUpperCase()
                    + operation.substring(1).toLowerCase()
                    + " Successful.\nCurrent Balance : ₹" + currentBalance;

            return ResponseEntity.ok(message);

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Transaction Failed : " + e.getMessage());
        }
    }
}