package com.Atm.atmManage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Atm.atmManage.model.Transaction;

public interface TrasanctionRepository extends JpaRepository<Transaction, Long> {

}
