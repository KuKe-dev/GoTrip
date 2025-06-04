package com.gotrip.Go_Trip.Services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gotrip.Go_Trip.Entities.Post;
import com.gotrip.Go_Trip.Entities.User;
import com.gotrip.Go_Trip.Repositories.PostRepository;
import com.gotrip.Go_Trip.Repositories.UserRepository;
import com.gotrip.Go_Trip.Utilities.CloudinaryService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CloudinaryService cloudinaryService;
    private final PostRepository postRepository;

    /* public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    } */

    public User registerUser(String username, String email, String password, 
        MultipartFile avatar, String bio) throws IOException {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("El nombre de usuario ya existe.");
        }

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("El email ya esta asociado a una cuenta.");
        }

        // Subir avatar a Cloudinary
        String avatarUrl = cloudinaryService.uploadImage(avatar, "avatars");

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setAvatar(avatarUrl); // Ahora almacenamos la URL completa
        user.setBio(bio);
        user.setCreatedAt(LocalDate.now());

        return userRepository.save(user);
    }

    public User login(String usernameOrEmail , String password) {

        Optional<User> userOptional = userRepository.findByUsername(usernameOrEmail);

        if (userOptional.isEmpty()) {
            userOptional = userRepository.findByEmail(usernameOrEmail);
        }

        User user = userOptional.orElseThrow(() ->
            new RuntimeException("Usuario o email no encontrado.")
        );

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta.");
        }

        return user;
    }

    public Map<String, String> getUserProfile(Long id) {
        User userProfile = userRepository.getUserProfile(id);

        Map<String, String> response = new HashMap<>();
        response.put("id", userProfile.getId().toString());
        response.put("username", userProfile.getUsername());
        response.put("avatar", userProfile.getAvatar());
        response.put("bio", userProfile.getBio());
        response.put("createdAt", userProfile.getCreatedAt().toString());


        return response;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> searchUsers(String searchTerm) {
        return userRepository.searchUsers(searchTerm);
    }

    @Transactional
    public void deleteUserById(Long id) {
        // Primero obtenemos el usuario para tener la URL del avatar
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Eliminamos el avatar de Cloudinary
        if (user.getAvatar() != null && !user.getAvatar().isEmpty()) {
            try {
                cloudinaryService.deleteImage(user.getAvatar());
            } catch (IOException e) {
                System.err.println("Error al eliminar avatar de Cloudinary: " + e.getMessage());
            }
        }    

        // Eliminamos los posts del usuario
        List<Post> posts = postRepository.getPostByUserId(id);
        for (Post post : posts) {
            // Eliminamos la imagen de Cloudinary
            if (post.getImg() != null && !post.getImg().isEmpty()) {
                try {
                    cloudinaryService.deleteImage(post.getImg());
                } catch (IOException e) {
                    // Puedes loggear el error pero no interrumpir la eliminación
                    System.err.println("Error al eliminar imagen de Cloudinary: " + e.getMessage());
                }
            }
        }
        userRepository.deleteUserPosts(id);
        
        // Finalmente eliminamos el usuario
        userRepository.deleteById(id);
    }

}