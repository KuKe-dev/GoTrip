package com.gotrip.Go_Trip.Repositories;

import com.gotrip.Go_Trip.Entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {

    @Query(value = "SELECT * FROM \"Posts\"", nativeQuery = true)
    List<Post> getPosts();

    @Query(value = "SELECT * FROM \"Posts\" WHERE id = :id", nativeQuery = true)
    Post getPostById(@Param("id") Long id);

}
