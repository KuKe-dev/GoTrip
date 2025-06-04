package com.gotrip.Go_Trip.Services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gotrip.Go_Trip.Entities.Post;
import com.gotrip.Go_Trip.Repositories.PostRepository;

import jakarta.transaction.Transactional;

import com.gotrip.Go_Trip.Utilities.CloudinaryService;



@Service
public class PostService {

    //* Methods injection
    private final PostRepository postRepository;
    private final CloudinaryService cloudinaryService;

    @Autowired
    public PostService(PostRepository postRepository, CloudinaryService cloudinaryService) {
        this.postRepository = postRepository;
        this.cloudinaryService = cloudinaryService;
    }

    //- Methods

    public List<Post> getPosts() {
        return postRepository.getPosts();
    }

    public Post getPostById(Long id) {
        return postRepository.getPostById(id);
    }

    public List<Post> getPostByUserId(Long id) {
    List<Post> posts = postRepository.getPostByUserId(id);
    return posts != null ? posts : Collections.emptyList(); // Ensure never null
    }


    @Transactional
    public Post addPost(Long userId, MultipartFile img, String description, 
        float latitude, float longitude) throws IOException {
        // Subir imagen a Cloudinary
        String imageUrl = cloudinaryService.uploadImage(img, "posts");

        Post post = new Post();
        post.setUserId(userId);
        post.setImg(imageUrl); // Ahora almacenamos la URL completa
        post.setDescription(description);
        post.setLatitude(latitude);
        post.setLongitude(longitude);

        return postRepository.save(post);
    }


    @Transactional
    public void deletePostsById(Long id) {
        // Primero obtenemos el post para tener la URL de la imagen
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post no encontrado"));
        
        // Eliminamos la imagen de Cloudinary
        if (post.getImg() != null && !post.getImg().isEmpty()) {
            try {
                cloudinaryService.deleteImage(post.getImg());
            } catch (IOException e) {
                // Puedes loggear el error pero no interrumpir la eliminación
                System.err.println("Error al eliminar imagen de Cloudinary: " + e.getMessage());
            }
        }
        
        // Finalmente eliminamos el post de la base de datos
        postRepository.deleteById(id);
    }

    public List<Post> getRandomPosts() {
        return postRepository.getRandomPosts();
    }

}