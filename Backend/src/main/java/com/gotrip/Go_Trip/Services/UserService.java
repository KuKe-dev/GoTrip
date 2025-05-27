package com.gotrip.Go_Trip.Services;

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

import com.gotrip.Go_Trip.Entities.User;
import com.gotrip.Go_Trip.Repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(String username, String email, String password, MultipartFile avatar, String bio) throws IOException{ // este metodo hace todo el trabajo cuando un usuario se registra, recibe los datos del usuario

        if(userRepository.existsByUsername(username)){
            throw new RuntimeException("El nombre de usuario ya existe.");
        }

        if(userRepository.existsByEmail(email)){
            throw new RuntimeException("El email ya esta asociado a una cuenta.");
        }
        String avatarName = saveAvatar(avatar, username);

        User user = new User();

        user.setUsername(username);
        user.setEmail(email);
        user.setPassword((passwordEncoder.encode(password))); //encripta la contraseña
        user.setAvatar(avatarName);
        user.setBio(bio);
        user.setCreatedAt(LocalDate.now());

        return userRepository.save(user);
    }
    private String saveAvatar(MultipartFile avatar, String username) throws IOException {
        String avatarName = username + "" + System.currentTimeMillis() + ".jpg"; // Genera un nombre único para la imagen
        String path = "src/main/resources/static/Img/Avatars/" + avatarName; // Ruta donde se guardará la imagen

        try (FileOutputStream fos = new FileOutputStream(path)) {
            fos.write(avatar.getBytes());
        }

        return avatarName;
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
        userRepository.deleteUserPosts(id);
        userRepository.deleteUser(id);
    }

}