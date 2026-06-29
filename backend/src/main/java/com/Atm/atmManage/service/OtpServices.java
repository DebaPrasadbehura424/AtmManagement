package com.Atm.atmManage.service;

import java.security.SecureRandom;

import org.springframework.stereotype.Service;

import com.Atm.atmManage.model.Otp;
import com.Atm.atmManage.repository.OtpRepository;

@Service
public class OtpServices {

    private final OtpRepository otpRepository;

    OtpServices(OtpRepository otpRepository) {
        this.otpRepository = otpRepository;
    }

    // Generate OTP
    public String generateOtp() {

        SecureRandom random = new SecureRandom();
        int otpValue = 100000 + random.nextInt(900000);

        Otp otp = new Otp();
        otp.setOtp(String.valueOf(otpValue));

        otpRepository.save(otp);

        return otp.getOtp();
    }

    // Check OTP
    public Otp checkOtp(String otp) {

        return otpRepository.findByOtp(otp);
    }

    // Delete OTP
    public void deleteOtp(Long id) {

        otpRepository.deleteById(id);
    }

}