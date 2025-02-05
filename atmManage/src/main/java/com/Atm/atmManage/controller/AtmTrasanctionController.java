package com.Atm.atmManage.controller;

import com.Atm.atmManage.model.Transaction;
import com.Atm.atmManage.model.User;
import com.Atm.atmManage.service.UserService;
import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/atmBalance")
public class AtmTrasanctionController {

    @Autowired
    private UserService userService;

    @GetMapping("/balanceEnquiry/{token}")
    public ResponseEntity<?> getBalanceEnquiry(@PathVariable String token) {
        try {
            User newQuiry = userService.getUserByToken(token);
            return new ResponseEntity<>(newQuiry.getBalance(), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }

    }

    @PatchMapping("/deposit/{token}/{depositAmount}")
    public ResponseEntity<?> depositMoney(@PathVariable String token, @PathVariable double depositAmount) {

        try {
            User dummyUser = userService.getUserByToken(token);
            if (dummyUser == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

            List<Transaction> transactionList = dummyUser.getTrsanctionList();
            if (transactionList == null) {
                transactionList = new ArrayList<>();
            }
            double oldBlance = dummyUser.getBalance();
            double newDeposit = depositAmount;
            dummyUser.setBalance(oldBlance + newDeposit);
            transactionList.add(new Transaction("Deposit", newDeposit, LocalDateTime.now()));
            dummyUser.setTrsanctionList(transactionList);
            userService.CreateAtmCard(dummyUser);

            return new ResponseEntity<>(dummyUser.getBalance(), HttpStatus.ACCEPTED);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @PatchMapping("/withdraw/{token}/{withdrawUser}")
    public ResponseEntity<?> withdrawMoney(@PathVariable String token, @PathVariable Double withdrawUser) {
        try {
            User dummyUser = userService.getUserByToken(token);

            if (dummyUser == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
            double oldBlance = dummyUser.getBalance();
            double newDeposit = withdrawUser;// with draw
            if (newDeposit == 0) {
                return new ResponseEntity<>("Enter valid amount", HttpStatus.NOT_ACCEPTABLE);
            }
            if (newDeposit % 100 != 0) {
                return new ResponseEntity<>("Enter valid amount", HttpStatus.NOT_ACCEPTABLE);
            }

            List<Transaction> transactionList = dummyUser.getTrsanctionList();
            if (transactionList == null) {
                transactionList = new ArrayList<>();
            }
            if (newDeposit <= oldBlance && oldBlance != 0) {
                dummyUser.setBalance(oldBlance - newDeposit);

                transactionList.add(new Transaction("WithDraw", newDeposit, LocalDateTime.now()));
                userService.CreateAtmCard(dummyUser);
                return new ResponseEntity<>(dummyUser.getBalance(), HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>("You have not that much money", HttpStatus.NOT_ACCEPTABLE);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @PatchMapping("/fundTransfer/{token}")
    public ResponseEntity<?> fundTransFromTo(@RequestBody User RecieverUser, @PathVariable String token) {
        String RecieverAccountNumber = RecieverUser.getAccountNumber();

        User senderUser = userService.getUserByToken(token);
        User RecieveAlldetailsAccount = userService.getUserExitOrNotByaccountNumber(RecieverAccountNumber);

        if (RecieveAlldetailsAccount == null) {
            return new ResponseEntity<>("Your reciever not found", HttpStatus.NOT_FOUND);
        }
        if (RecieveAlldetailsAccount.getToken().equals(token)) {
            return new ResponseEntity<>("You cant send on your own", HttpStatus.NOT_FOUND);
        }

        if (senderUser == null) {
            return new ResponseEntity<>("Your sender not found", HttpStatus.NOT_FOUND);
        }
        Double senderSendAmount = senderUser.getBalance();
        Double RecieverAcceptMoney = RecieverUser.getBalance();
        if (RecieverAcceptMoney % 100 != 0) {
            return new ResponseEntity<>("Your reciever not found", HttpStatus.NOT_ACCEPTABLE);
        }

        List<Transaction> transactionList = senderUser.getTrsanctionList();
        if (transactionList == null) {
            transactionList = new ArrayList<>();
        }

        if (senderSendAmount >= RecieverAcceptMoney && RecieverAcceptMoney > 0) {
            Double lossAmount = senderSendAmount - RecieverAcceptMoney;
            Double profitAmount = RecieveAlldetailsAccount.getBalance() + RecieverAcceptMoney;
            senderUser.setBalance(lossAmount);
            RecieveAlldetailsAccount.setBalance(profitAmount);

            transactionList.add(new Transaction("Transfer", RecieverAcceptMoney, LocalDateTime.now()));

            userService.CreateAtmCard(senderUser);
            userService.CreateAtmCard(RecieveAlldetailsAccount);
            return new ResponseEntity<>(senderUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/changePin/{token}")
    public ResponseEntity<?> checkOldwithinout(@RequestBody User newUser, @PathVariable String token) {
        try {
            User changePinUser = userService.getUserByToken(token);
            if (changePinUser == null) {
                return new ResponseEntity<>("user not found", HttpStatus.NOT_FOUND);
            }

            String oldPin = changePinUser.getPin();
            String newpin = newUser.getPin();
            if (oldPin.equals(newpin)) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("user not found", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/update/{token}")
    public ResponseEntity<?> chnagePinNow(@RequestBody User newUser, @PathVariable String token) {
        try {
            User changePinUser = userService.getUserByToken(token);
            if (changePinUser == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            String newpin = newUser.getPin();
            changePinUser.setPin(newpin);
            userService.CreateAtmCard(changePinUser);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/recharge/{token}/{rechargeUser}")
    public ResponseEntity<?> MobileReacharge(@PathVariable String token, @PathVariable Double rechargeUser) {
        try {
            User dummyUser = userService.getUserByToken(token);

            if (dummyUser == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
            double oldBlance = dummyUser.getBalance();
            double newDeposit = rechargeUser;
            if (newDeposit == 0) {
                return new ResponseEntity<>("Enter valid amount", HttpStatus.NOT_ACCEPTABLE);
            }
            if (newDeposit % 100 != 0) {
                return new ResponseEntity<>("Enter valid amount", HttpStatus.NOT_ACCEPTABLE);
            }

            List<Transaction> transactionList = dummyUser.getTrsanctionList();
            if (transactionList == null) {
                transactionList = new ArrayList<>();
            }
            if (newDeposit <= oldBlance && oldBlance != 0) {
                dummyUser.setBalance(oldBlance - newDeposit);
                transactionList.add(new Transaction("Recharge", newDeposit, LocalDateTime.now()));
                userService.CreateAtmCard(dummyUser);
                return new ResponseEntity<>(dummyUser.getBalance(), HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>("You have not that much money", HttpStatus.NOT_ACCEPTABLE);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }
}