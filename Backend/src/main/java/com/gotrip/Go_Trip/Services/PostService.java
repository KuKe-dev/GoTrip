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



@Service
public class PostService {

    //* Methods injection
    @Autowired
    private PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
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
    public Post addPost(Long userId, MultipartFile img, String description, float latitude, float longitude) throws IOException {

        String imgName = saveImage(img, userId); 

        Post post = new Post();
        post.setUserId(userId);
        post.setImg(imgName);
        post.setDescription(description);
        post.setLatitude(latitude);
        post.setLongitude(longitude);
        // Guardar la imagen y obtener su nombre
        // return postRepository.addPost(userId, imgName, description, latitude, longitude);
        return postRepository.save(post);
    }

    private String saveImage(MultipartFile img, Long userId) throws IOException {
        String imgName = userId + "" + System.currentTimeMillis() + ".jpg";
        String path = "src/main/resources/static/Img/Posts/" + imgName;
        
        // Crear directorio si no existe
        new File("src/main/resources/static/Img/Posts/").mkdirs();
        
        try (FileOutputStream fos = new FileOutputStream(path)) {
            fos.write(img.getBytes());
        }
        
        return imgName;
    }


    @Transactional
public void deletePostsById(Long id) {
     // Obtener el nombre de la imagen
    String imgName = postRepository.getImgName(id);
    if (imgName != null && !imgName.trim().isEmpty()) {
        Path imagePath = Paths.get("src/main/resources/static/Img/Posts", imgName);
        File file = new File(imagePath.toString());
        file.delete(); // Elimina el archivo si existe
    }
    postRepository.deleteById(id); 
} 

    public List<Post> getRandomPosts() {
        return postRepository.getRandomPosts();
    }
    //TODO: addPost()
    //TODO: updatePost(id)
    //TODO: deletePost(id)

    //TODO: getImgName(id)

    

}