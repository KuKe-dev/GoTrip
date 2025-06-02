package com.gotrip.Go_Trip.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gotrip.Go_Trip.Entities.Post;

public interface PostRepository extends JpaRepository<Post,Long> {

    //- SQL's Queries

    @Query(value = "SELECT * FROM posts", nativeQuery = true)
    List<Post> getPosts();

    @Query(value = "SELECT * FROM posts WHERE id = :id", nativeQuery = true)
    Post getPostById(@Param("id") Long id);

    @Query(value = "SELECT * FROM posts WHERE `user-id` = :id", nativeQuery = true)
    List<Post> getPostByUserId(@Param("id") Long id);

    @Query(value = "SELECT img FROM posts WHERE id = :id", nativeQuery = true)
    String getImgName(@Param("id") Long id); 

    @Query(value = "SELECT * FROM posts ORDER BY RAND() LIMIT 5", nativeQuery = true)
    List<Post> getRandomPosts();

}