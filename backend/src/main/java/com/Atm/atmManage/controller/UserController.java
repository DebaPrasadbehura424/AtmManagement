package com.Atm.atmManage.controller;

import com.Atm.atmManage.model.Otp;
import com.Atm.atmManage.model.Transaction;
import com.Atm.atmManage.model.User;
import com.Atm.atmManage.service.EmailService;
import com.Atm.atmManage.service.OtpServices;
import com.Atm.atmManage.service.UserService;

import jakarta.mail.MessagingException;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final OtpServices otpServices;
    private final EmailService emailService;

    UserController(UserService userService, OtpServices otpServices, EmailService emailService) {
        this.userService = userService;
        this.otpServices = otpServices;
        this.emailService = emailService;
    }

    @PostMapping("/createAccount")
    public ResponseEntity<String> createAccount(@RequestBody User user) {
        String accountNumber = userService.getAccountNumberFromService();
        String ifse = userService.getAccountNumberFromService();
        user.setAccountNumber(accountNumber);
        user.setIfseCode(ifse);
        user.setCreationDateTime(LocalDateTime.now());
        userService.saveUser(user);
        return new ResponseEntity<>("Created successfully", HttpStatus.CREATED);
    }

    @PostMapping("/createAtm/{accountNumber}")
    public ResponseEntity<?> creatAtm(@RequestParam String accountNumber) {
        try {
            User existUser = userService.getUserByAccountNumber(accountNumber);
            if (existUser == null) {
                return new ResponseEntity<>("Not found user", HttpStatus.NOT_FOUND);
            }

            String atmNumber = userService.getAccountNumberFromService();
            existUser.setAtmNumber(atmNumber);

            userService.saveUser(existUser);
            return new ResponseEntity<>("Atm Created", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Login using Account Number & PIN
    @PostMapping("/accnum/pin")
    public ResponseEntity<?> getUserByAccountAndPin(@RequestBody User loginUser) {
        try {
            User currentUser = userService.getUserExitOrNotByaccountNumber(
                    loginUser.getAccountNumber());

            if (currentUser == null) {
                return new ResponseEntity<>("User not found",
                        HttpStatus.NOT_FOUND);
            }

            boolean pinMatched = userService
                    .getUserExitOrNotByaccountNumberAndPin(currentUser,
                            loginUser.getPin());

            if (!pinMatched) {
                return new ResponseEntity<>("Incorrect PIN",
                        HttpStatus.UNAUTHORIZED);
            }

            return ResponseEntity.ok(currentUser);

        } catch (Exception e) {

            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Send OTP
    @GetMapping("/accountFinder/{accountNumber}")
    public ResponseEntity<?> accountFinder(
            @PathVariable String accountNumber)
            throws MessagingException {

        User currentUser = userService.getUserExitOrNotByaccountNumber(accountNumber);

        if (currentUser == null) {
            return new ResponseEntity<>("User not found",
                    HttpStatus.NOT_FOUND);
        }

        String otp = otpServices.generateOtp();

        emailService.sendEmail(currentUser.getEmail(),
                "OTP Verification",
                otp);

        return ResponseEntity.ok(currentUser);
    }

    // Forget Password
    @PatchMapping("/forgetPassword/{accountNumber}/{otp}")
    public ResponseEntity<?> otpCheck(
            @PathVariable String accountNumber,
            @PathVariable String otp,
            @RequestBody User newUser) {

        Otp otpUser = otpServices.checkOtp(otp);

        if (otpUser == null) {
            return new ResponseEntity<>("Invalid OTP",
                    HttpStatus.NOT_FOUND);
        }

        otpServices.deleteOtp(otpUser.getId());

        User currentUser = userService.getUserExitOrNotByaccountNumber(accountNumber);

        if (currentUser == null) {
            return new ResponseEntity<>("User not found",
                    HttpStatus.NOT_FOUND);
        }

        currentUser.setPin(newUser.getPin());

        userService.saveUser(currentUser);

        return new ResponseEntity<>("PIN Updated Successfully",
                HttpStatus.OK);
    }

    // Transaction History
    @GetMapping("/History/{accountNumber}")
    public ResponseEntity<?> getAllTransactionHistoryOfUser(
            @PathVariable String accountNumber) {

        User currentUser = userService.getUserByAccountNumber(accountNumber);

        if (currentUser == null) {
            return new ResponseEntity<>("User not found",
                    HttpStatus.NOT_FOUND);
        }

        List<Transaction> transactions = currentUser.getTransactionList();

        return ResponseEntity.ok(transactions);
    }

}