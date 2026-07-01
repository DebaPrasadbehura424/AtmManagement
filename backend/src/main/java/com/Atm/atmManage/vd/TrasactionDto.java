package com.Atm.atmManage.vd;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class TrasactionDto {
    private String accountNumber;
    private Double transactionAmount;
    private String mode;
    private String transactionType;
    private LocalDateTime transactionDate;
}
