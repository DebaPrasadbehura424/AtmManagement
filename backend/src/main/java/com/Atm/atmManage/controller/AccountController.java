package com.Atm.atmManage.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Atm.atmManage.model.User;
import com.Atm.atmManage.service.AccountService;
import com.Atm.atmManage.service.UserService;
import com.Atm.atmManage.vd.TrasactionDto;
import com.Atm.atmManage.vd.UpdateAccountDto;

@RestController
@RequestMapping("/info")
public class AccountController {

    private final AccountService accountService;
    private final UserService userService;

    public AccountController(AccountService accountService, UserService userService) {
        this.accountService = accountService;
        this.userService = userService;
    }

    // ==========================================
    // Balance Enquiry
    // ==========================================

    @GetMapping("/balanceEnquiry")
    public ResponseEntity<?> getBalanceEnquiry(@RequestBody TrasactionDto dto) {

        try {

            Double balance = accountService.balanceEnquiry(dto.getAccountNumber());

            return new ResponseEntity<>(balance, HttpStatus.OK);

        } catch (RuntimeException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);

        } catch (Exception e) {

            return new ResponseEntity<>("Internal Server Error",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/getAccount/{accountNumber}")
    public ResponseEntity<?> getAccount(@PathVariable String accountNumber) {
        System.out.println(accountNumber);
        try {
            System.out.println("🔍 Received Account Number: [" + accountNumber + "]");

            if (accountNumber == null || accountNumber.trim().isEmpty()) {
                return new ResponseEntity<>("Account number cannot be empty", HttpStatus.BAD_REQUEST);
            }

            User user = userService.getUserByAccountNumber(accountNumber.trim());

            if (user == null) {
                System.out.println("❌ User not found for account: " + accountNumber);
                return new ResponseEntity<>("Account Not Found", HttpStatus.NOT_FOUND);
            }

            System.out.println("✅ User Found: " + user.getFirstName() + " " + user.getLastName());
            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch (RuntimeException e) {
            System.out.println("Runtime Error: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/getAtm/{accountNumber}")
    public ResponseEntity<?> getAtm(@PathVariable String accountNumber) {
        System.out.println("Account number" + accountNumber);
        try {

            if (accountNumber == null || accountNumber.trim().isEmpty()) {
                return new ResponseEntity<>("Account number cannot be empty", HttpStatus.BAD_REQUEST);
            }

            User user = userService.getUserByAccountNumber(accountNumber.trim());

            System.out.println(user);

            if (user == null) {
                System.out.println("❌ User not found for account: " + accountNumber);
                return new ResponseEntity<>("Account Not Found", HttpStatus.NOT_FOUND);
            }
            String atmNumber = userService.getAccountNumberFromService();
            user.setAtmNumber(atmNumber);
            userService.saveUser(user);

            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // ==========================================
    // Deposit
    // ==========================================

    @PatchMapping("/deposit")
    public ResponseEntity<?> deposit(@RequestBody TrasactionDto dto) {

        try {

            Double balance = accountService.deposit(dto);

            return new ResponseEntity<>(balance, HttpStatus.OK);

        } catch (RuntimeException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);

        } catch (Exception e) {

            return new ResponseEntity<>("Internal Server Error",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // ==========================================
    // Withdraw
    // ==========================================

    @PatchMapping("/withdraw/{accountNumber}/{amount}/{mode}")
    public ResponseEntity<?> withdraw(@PathVariable String accountNumber,
            @PathVariable Double amount,
            @PathVariable String mode) {

        try {

            Double balance = accountService.withdraw(accountNumber, amount, mode);

            return new ResponseEntity<>(balance, HttpStatus.OK);

        } catch (RuntimeException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);

        } catch (Exception e) {

            return new ResponseEntity<>("Internal Server Error",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // ==========================================
    // Update ATM PIN
    // ==========================================

    @GetMapping("/cheak-pin/{atmNumber}/{pin}")
    public ResponseEntity<?> checkPin(@PathVariable String atmNumber,
            @PathVariable String pin) {

        System.out.println(pin);
        System.out.println(pin.getClass());

        try {
            // for now we use account number later i will update ok
            User user = userService.getUserByAtmNumber(atmNumber);

            if (!user.getPin().equals(pin)) {
                return new ResponseEntity<>("Pin Mismatch", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch (RuntimeException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);

        } catch (Exception e) {

            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PatchMapping("/update-pin/{atmNumber}/{newPin}")
    public ResponseEntity<?> updatePin(@PathVariable String atmNumber,
            @PathVariable String newPin) {

        System.out.println(atmNumber);
        System.out.println(newPin);

        try {

            String message = accountService.updateAtmPin(atmNumber, newPin);

            return new ResponseEntity<>(message, HttpStatus.OK);

        } catch (RuntimeException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);

        } catch (Exception e) {

            return new ResponseEntity<>("Internal Server Error",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // ==========================================
    // Update Account Details
    // ==========================================

    @PatchMapping("/update-account/{accountNumber}")
    public ResponseEntity<?> updateAccount(@PathVariable String accountNumber,
            @RequestBody UpdateAccountDto dto) {

        try {

            User user = accountService.updateAccount(accountNumber, dto);

            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch (RuntimeException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);

        } catch (Exception e) {

            return new ResponseEntity<>("Internal Server Error",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // ==========================================
    // Delete ATM
    // ==========================================

    @DeleteMapping("/delete-atm/{atmNumber}")
    public ResponseEntity<?> deleteAtm(@PathVariable String atmNumber) {

        try {

            String message = accountService.deleteAtm(atmNumber);

            return new ResponseEntity<>(message, HttpStatus.OK);

        } catch (RuntimeException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);

        } catch (Exception e) {

            return new ResponseEntity<>("Internal Server Error",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // ==========================================
    // Delete Account
    // ==========================================

    @DeleteMapping("/delete-account/{accountNumber}")
    public ResponseEntity<?> deleteAccount(@PathVariable String accountNumber) {

        try {

            String message = accountService.deleteAccount(accountNumber);

            return new ResponseEntity<>(message, HttpStatus.OK);

        } catch (RuntimeException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);

        } catch (Exception e) {

            return new ResponseEntity<>("Internal Server Error",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}