package com.gotrip.Go_Trip.Controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gotrip.Go_Trip.Entities.Post;
import com.gotrip.Go_Trip.Services.PostService;

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

    //- http://localhost:8080/api/posts/%7Bid%7D

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getPostByUserId(@PathVariable Long id) {
        try {
            List<Post> posts = postService.getPostByUserId(id);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error fetching posts");
        }
    }

    @GetMapping(value = "/img/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
        
        Path imagePath = Paths.get("src/main/resources/static/Img/Posts/" + imageName);
        
        if (!Files.exists(imagePath)) {
            return ResponseEntity.notFound().build();
        }
        
        byte[] imageBytes = Files.readAllBytes(imagePath);
        
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(imageBytes);
}

    @PostMapping()
    public void addPost( @RequestParam("userId") Long userId,
            @RequestParam("image") MultipartFile image,
            @RequestParam("description") String description,
            @RequestParam("latitude") float latitude,
            @RequestParam("longitude") float longitude) throws IOException {

        /* long userId = 1; */
        try {
            postService.addPost(userId, image, description, latitude, longitude);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }

    @GetMapping("/randoms")
    public List<Post> getRandomPosts() {
        return postService.getRandomPosts();
    }


    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePostsById(id);
    } 

    //DONE: GET     api/posts
    //TODO: POST    api/posts

    //DONE: GET     api/posts/{id}
    //TODO: PUT     api/posts/{id}
    //TODO: DELETE  api/posts/{id}

    //DONE: GET     api/posts/img/{id}

}