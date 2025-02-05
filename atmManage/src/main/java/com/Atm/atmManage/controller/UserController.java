package com.Atm.atmManage.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private OtpServices otpServices;

    @Autowired
    private EmailService emailService;

    @PostMapping("/createAtm")
    public ResponseEntity<?> saveAtmDetails(@RequestBody User user) {
        try {
            if (user.getAadharNumber() == null || user.getAadharNumber().isEmpty()) {
                return new ResponseEntity<>("Aadhar number is required", HttpStatus.BAD_REQUEST);
            }

            if (userService.checkAadharExistOrNot(user.getAadharNumber())) {
                return new ResponseEntity<>("This Aadhar already in use", HttpStatus.ALREADY_REPORTED);
            }
            String jwts = JwtTokenProvider.generateToken(user.getAadharNumber());

            User newUser2User = new User();
            newUser2User.setFirstName(user.getFirstName());
            newUser2User.setLastName(user.getLastName());
            newUser2User.setAddress(user.getAddress());
            newUser2User.setEmail(user.getEmail());
            newUser2User.setAadharNumber(user.getAadharNumber());
            newUser2User.setPhoneNumber(user.getPhoneNumber());
            newUser2User.setToken(jwts);

            String accNumber = userService.getAccountNumberFromService();

            newUser2User.setAccountNumber(accNumber);
            newUser2User.setCreationDateTime(LocalDateTime.now());
            newUser2User.setBalance(0.0);
            newUser2User.setPin("0");

            userService.CreateAtmCard(newUser2User);

            return new ResponseEntity<>(newUser2User, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Error creating ATM: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/aadharNumber/{aadharNumber}")
    public ResponseEntity<?> getFromAadhar(@PathVariable String aadharNumber) {
        try {
            User getUserDetails = userService.getUserByAadharCard(aadharNumber);
            if (getUserDetails == null) {
                return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<User>(getUserDetails, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/accNum/pin")
    public ResponseEntity<?> getUserByAccountAndPin(@RequestBody User checkUser) {
        String accountNumber = checkUser.getAccountNumber();
        String pin = checkUser.getPin();

        try {
            User currentUser = userService.getUserExitOrNotByaccountNumber(accountNumber);

            if (currentUser == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
            boolean pinCheck = userService.getUserExitOrNotByaccountNumberAndPin(currentUser, pin);
            if (!pinCheck) {
                return new ResponseEntity<>("Incorrect PIN", HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<>(currentUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/accountFinder/{accountNumber}")
    public ResponseEntity<?> UpdatePinOfUser(@PathVariable String accountNumber) throws MessagingException {

        User currentUser = userService.getUserExitOrNotByaccountNumber(accountNumber);
        if (currentUser == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        String otpReal = otpServices.generateOtp();
        emailService.sendEmail(currentUser.getEmail(), "OTP", otpReal);
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

    @PatchMapping("/forgetPassword/{accountNumber}/{otp}")
    public ResponseEntity<?> otpCheck(@PathVariable String otp, @PathVariable String accountNumber,
            @RequestBody User newUser) {
        Otp otpuser = otpServices.checkOtp(otp);
        if (otpuser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        otpServices.deleteOtp(otpuser.getId());
        User currentUser = userService.getUserExitOrNotByaccountNumber(accountNumber);
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        currentUser.setPin(newUser.getPin());
        userService.CreateAtmCard(currentUser);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/History/{token}")
    public ResponseEntity<?> getAllTrasanctionHistoryOfUser(@PathVariable String token) {
        User currentUserTrasactionHistory = userService.getUserByToken(token);
        if (currentUserTrasactionHistory == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
        List<Transaction> showAllTrasanctionOfCurrentUser = currentUserTrasactionHistory.getTrsanctionList();
        return new ResponseEntity<>(showAllTrasanctionOfCurrentUser, HttpStatus.OK);
    }

}
