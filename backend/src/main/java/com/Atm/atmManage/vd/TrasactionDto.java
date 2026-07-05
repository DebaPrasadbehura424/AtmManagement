package com.Atm.atmManage.vd;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class TrasactionDto {
    private String accountNumber;
    private String atmNumber;
    private Double transactionAmount;
    private String mode;
    private String operation;
    private String name;
    private String date;
    private String transactionType;
    private LocalDateTime transactionDate;
}
