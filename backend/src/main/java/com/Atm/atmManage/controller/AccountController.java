package com.Atm.atmManage.controller;

import com.Atm.atmManage.model.Transaction;
import com.Atm.atmManage.model.User;
import com.Atm.atmManage.service.UserService;
import com.Atm.atmManage.vd.TrasactionDto;

import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/info")
public class AccountController {

    private final UserService userService;
    // we have to mode accoding to that use account number and atm numberbn

    AccountController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/balanceEnquiry")
    public ResponseEntity<?> getBalanceEnquiry(@RequestBody TrasactionDto tans) {
        try {
            User newQuiry = userService.getUserByAccountNumber(tans.getAccountNumber());
            return new ResponseEntity<>(newQuiry.getBalance(), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }

    }

    @PatchMapping("/deposit")
    public ResponseEntity<?> depositMoney(@RequestBody TrasactionDto trans) {

        try {
            User currentUser = userService.getUserByAccountNumber(trans.getAccountNumber());
            if (currentUser == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

            List<Transaction> transactionList = currentUser.getTransactionList();
            if (transactionList == null) {
                transactionList = new ArrayList<>();
            }

            double oldBlance = currentUser.getBalance();
            double newDeposit = trans.getTransactionAmount();
            currentUser.setBalance(oldBlance + newDeposit);

            transactionList.add(new Transaction("Deposit", trans.getMode(), newDeposit, LocalDateTime.now()));
            currentUser.setTransactionList(transactionList);
            userService.saveUser(currentUser);

            return new ResponseEntity<>(currentUser.getBalance(), HttpStatus.ACCEPTED);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @PatchMapping("/withdraw/{accountNumber}/{withdrawUser}/{mode}")
    public ResponseEntity<?> withdrawMoney(@PathVariable String accountNumber, @PathVariable Double withdrawUser,
            @PathVariable String mode) {
        try {
            User currentUser = userService.getUserByAccountNumber(accountNumber);

            if (currentUser == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
            double oldBlance = currentUser.getBalance();
            double newDeposit = withdrawUser;// with draw
            if (newDeposit == 0) {
                return new ResponseEntity<>("Enter valid amount", HttpStatus.NOT_ACCEPTABLE);
            }
            if (newDeposit % 100 != 0) {
                return new ResponseEntity<>("Enter valid amount", HttpStatus.NOT_ACCEPTABLE);
            }

            List<Transaction> transactionList = currentUser.getTransactionList();
            if (transactionList == null) {
                transactionList = new ArrayList<>();
            }
            if (newDeposit <= oldBlance && oldBlance != 0) {
                currentUser.setBalance(oldBlance - newDeposit);

                transactionList.add(new Transaction("WithDraw", mode, newDeposit, LocalDateTime.now()));
                userService.saveUser(currentUser);
                return new ResponseEntity<>(currentUser.getBalance(), HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>("You have not that much money", HttpStatus.NOT_ACCEPTABLE);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

}