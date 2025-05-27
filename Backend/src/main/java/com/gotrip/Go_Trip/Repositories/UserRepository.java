package com.gotrip.Go_Trip.Repositories;

import java.util.List;

import com.gotrip.Go_Trip.Entities.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface UserRepository extends JpaRepository<User, Long>{ //Esta trabjando con la clase User y la clave primaria es de tipo Long


    Optional<User> findByUsername(String username);//busca usuarios por su nombre de usuario

    Optional<User> findByEmail(String email);//busca usuarios por su email

    boolean existsByUsername(String username);//verifica si ese usuario ya existe

    boolean existsByEmail(String email);  //verifica si ese usuario ya existe

    @Query(value = "SELECT * FROM gotrip_db.users WHERE id=:id", nativeQuery = true)
    User getUserProfile(@Param("id") Long id);

    @Modifying
    @Query(value = "DELETE FROM gotrip_db.posts WHERE `user-id` = :id", nativeQuery = true)
    void deleteUserPosts(@Param("id") Long id);

    @Modifying
    @Query(value = "DELETE FROM gotrip_db.users WHERE id = :id", nativeQuery = true)
    void deleteUser(@Param("id") Long id);

    @Query(value = "SELECT * FROM users WHERE username LIKE concat('%',:searchTerm,'%')", nativeQuery = true)
    List<User> searchUsers(@Param("searchTerm") String searchTerm);
}