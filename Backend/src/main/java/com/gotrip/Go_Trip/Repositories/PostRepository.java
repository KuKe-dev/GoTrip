package com.gotrip.Go_Trip.Repositories;

import com.gotrip.Go_Trip.Entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {

    //- SQL's Queries

    @Query(value = "SELECT * FROM \"Posts\"", nativeQuery = true)
    List<Post> getPosts();

    @Query(value = "SELECT * FROM \"Posts\" WHERE id = :id", nativeQuery = true)
    Post getPostById(@Param("id") Long id);

    //TODO: addPost()
    //TODO: updatePost(id)
    //TODO: deletePost(id)

    //TODO: getImgName(id)

}
