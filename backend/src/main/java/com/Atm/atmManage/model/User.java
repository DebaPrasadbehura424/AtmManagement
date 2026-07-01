package com.Atm.atmManage.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String dob;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, unique = true)
    private String panNumber;

    @Column(nullable = false, unique = true)
    private String aadhaarNumber;

    @Column(nullable = false, unique = true)
    private String accountNumber;

    @Column(nullable = false, unique = true)
    private String IfseCode;

    @Column(unique = true)
    private String atmNumber;

    @Column(unique = true)
    private String pin;

    @Column(nullable = false, unique = true)
    private String accountType;

    private String nomineeName;

    @Column(nullable = false)
    private double balance;

    @Column(nullable = false)
    private LocalDateTime creationDateTime;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transaction> transactionList = new ArrayList<>();
}