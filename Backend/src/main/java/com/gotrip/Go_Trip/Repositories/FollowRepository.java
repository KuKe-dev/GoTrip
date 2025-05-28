package com.gotrip.Go_Trip.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gotrip.Go_Trip.Entities.Follow;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query(value= "SELECT following_id FROM Follows WHERE follower_id = :id", nativeQuery = true)
    List<Long> getFollowings(@Param("id") Long id);

    boolean existsByFollowerIdAndFollowingId(Long followerId, Long followingId);
    

    @Modifying
    @Query(value= "INSERT INTO Follows (follower_id, following_id) VALUES (:followerId, :followingId)", nativeQuery = true)
    void saveFollow(@Param("followerId") Long followerId, @Param("followingId") Long followingId);

    @Modifying
    @Query(value= "DELETE FROM Follows WHERE follower_id = :followerId AND following_id = :followingId", nativeQuery = true)
    void deleteFollow(@Param("followerId") Long followerId, @Param("followingId") Long followingId);
    
}