package com.Atm.atmManage.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String transactionType;

    @Column(nullable = false)
    private String mode;

    @Column(nullable = false)
    private Double transactionAmount;

    @Column(nullable = false)
    private LocalDateTime transactionDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public Transaction(String transactionType,
            String mode,
            Double transactionAmount,
            LocalDateTime transactionDate) {

        this.transactionType = transactionType;
        this.mode = mode;
        this.transactionAmount = transactionAmount;
        this.transactionDate = transactionDate;
    }
}