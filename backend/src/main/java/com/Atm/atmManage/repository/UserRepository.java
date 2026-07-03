package com.Atm.atmManage.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Atm.atmManage.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    User findUserByAccountNumber(String accountNumber);

    User findByAtmNumber(String atmNumber);

    User findUserByAtmNumber(String trim);

}