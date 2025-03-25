package com.gotrip.Go_Trip.Repositories;

import com.gotrip.Go_Trip.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM \"Users\"", nativeQuery = true)
    List<User> getUsers();

}
