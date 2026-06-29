package com.Atm.atmManage.jwt;

import javax.crypto.SecretKey;

import io.jsonwebtoken.security.Keys;

public class JwtTokenConstant {
    public static final int EXPIRE_TIME = 1000 * 60 * 60 * 24;
    public static final String JSON_KEY = "jwduihduihhihwqihihiwhiuwiuhiuhfiuhiua";
    public static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(JSON_KEY.getBytes());

}
