package com.gotrip.Go_Trip.Controllers;

import com.gotrip.Go_Trip.Entities.Post;
import com.gotrip.Go_Trip.Services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    //* Methods injection
    @Autowired
    private PostService postService;

    //- http://localhost:8080/api/posts

    @GetMapping
    public List<Post> getPosts() {
        return postService.getPosts();
    }

    //- http://localhost:8080/api/posts/{id}

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    //DONE: GET     api/posts
    //TODO: POST    api/posts

    //DONE: GET     api/posts/{id}
    //TODO: PUT     api/posts/{id}
    //TODO: DELETE  api/posts/{id}

    //TODO: GET     api/posts/img/{id}

}
