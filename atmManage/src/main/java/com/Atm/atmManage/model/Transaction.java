package com.Atm.atmManage.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Transaction {
    private String trasactionType;
    private Double trasanctions;
    private LocalDateTime data;
}
