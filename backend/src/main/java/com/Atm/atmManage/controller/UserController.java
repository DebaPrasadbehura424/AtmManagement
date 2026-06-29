package com.Atm.atmManage.controller;

import com.Atm.atmManage.jwt.JwtTokenProvider;
import com.Atm.atmManage.model.Otp;
import com.Atm.atmManage.model.Transaction;
import com.Atm.atmManage.model.User;
import com.Atm.atmManage.service.EmailService;
import com.Atm.atmManage.service.OtpServices;
import com.Atm.atmManage.service.UserService;

import jakarta.mail.MessagingException;

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

    // Create ATM Account
    @PostMapping("/createAtm")
    public ResponseEntity<?> saveAtmDetails(@RequestBody User user) {

        try {

            if (user.getAadharNumber() == null || user.getAadharNumber().isEmpty()) {
                return new ResponseEntity<>("Aadhar Number is required", HttpStatus.BAD_REQUEST);
            }

            if (userService.checkAadharExistOrNot(user.getAadharNumber())) {
                return new ResponseEntity<>("This Aadhar is already registered",
                        HttpStatus.CONFLICT);
            }

            String jwt = JwtTokenProvider.generateToken(user.getAadharNumber());

            User newUser = new User();
            newUser.setFirstName(user.getFirstName());
            newUser.setLastName(user.getLastName());
            newUser.setAddress(user.getAddress());
            newUser.setEmail(user.getEmail());
            newUser.setPhoneNumber(user.getPhoneNumber());
            newUser.setAadharNumber(user.getAadharNumber());

            newUser.setAccountNumber(userService.getAccountNumberFromService());
            newUser.setCreationDateTime(LocalDateTime.now());
            newUser.setBalance(0.0);
            newUser.setPin("0");
            newUser.setToken(jwt);

            userService.saveUser(newUser);

            return new ResponseEntity<>(newUser, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Find user by Aadhar
    @GetMapping("/aadharNumber/{aadharNumber}")
    public ResponseEntity<?> getFromAadhar(@PathVariable String aadharNumber) {

        User user = userService.getUserByAadharCard(aadharNumber);

        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(user);
    }

    // Login using Account Number & PIN
    @PostMapping("/accNum/pin")
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
    @GetMapping("/History/{token}")
    public ResponseEntity<?> getAllTransactionHistoryOfUser(
            @PathVariable String token) {

        User currentUser = userService.getUserByToken(token);

        if (currentUser == null) {
            return new ResponseEntity<>("User not found",
                    HttpStatus.NOT_FOUND);
        }

        List<Transaction> transactions = currentUser.getTransactionList();

        return ResponseEntity.ok(transactions);
    }

}