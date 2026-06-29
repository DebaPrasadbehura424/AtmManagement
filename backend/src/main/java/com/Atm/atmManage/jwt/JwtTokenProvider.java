package com.Atm.atmManage.jwt;

import io.jsonwebtoken.Jwts;

import java.util.Date;

public class JwtTokenProvider {

    public static String generateToken(String accountNumber) {

        return Jwts.builder()
                .subject(accountNumber)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + JwtTokenConstant.EXPIRE_TIME))
                .signWith(JwtTokenConstant.SECRET_KEY)
                .compact();
    }
}