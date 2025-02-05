package com.Atm.atmManage.service;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Atm.atmManage.model.Otp;
import com.Atm.atmManage.repository.OtpRepository;

import java.security.SecureRandom;

@Service
public class OtpServices {
    @Autowired
    private OtpRepository otpRepository;

    public String generateOtp() {
        SecureRandom random = new SecureRandom();
        int otpValue = 100000 + random.nextInt(900000);
        Otp otp = new Otp();
        otp.setOtp(String.valueOf(otpValue));

        otpRepository.save(otp);
        return otp.getOtp();
    }

    public Otp checkOtp(String otp) {
        Otp newOtp = otpRepository.findByOtp(otp);
        if (newOtp == null) {
            return null;
        }
        return newOtp;
    }

    public void deleteOtp(ObjectId id) {
        otpRepository.deleteById(id);
    }
}
