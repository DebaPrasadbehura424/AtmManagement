package com.Atm.atmManage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Atm.atmManage.model.Otp;

public interface OtpRepository extends JpaRepository<Otp, Long> {

    Otp findByOtp(String otp);
}
