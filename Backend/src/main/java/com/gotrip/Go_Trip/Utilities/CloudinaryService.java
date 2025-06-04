package com.gotrip.Go_Trip.Utilities;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public CloudinaryService() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", System.getenv("CLOUDINARY_CLOUD_NAME"));
        config.put("api_key", System.getenv("CLOUDINARY_API_KEY"));
        config.put("api_secret", System.getenv("CLOUDINARY_API_SECRET"));
        this.cloudinary = new Cloudinary(config);
    }

    public String uploadImage(MultipartFile file, String folder) throws IOException {
        String publicId = folder + "_" + System.currentTimeMillis();
        
        Map<String, Object> uploadParams = new HashMap<>();
        uploadParams.put("public_id", publicId);
        uploadParams.put("folder", folder);
        uploadParams.put("overwrite", false);
        
        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadParams);
        return (String) uploadResult.get("secure_url");
    }

    public void deleteImage(String imageUrl) throws IOException {
        String publicId = extractPublicIdFromUrl(imageUrl);
        if (publicId != null) {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        }
    }

    private String extractPublicIdFromUrl(String url) {
        // Extrae el public_id de la URL de Cloudinary
        try {
            String[] parts = url.split("/");
            String lastPart = parts[parts.length - 1];
            return lastPart.split("\\.")[0];
        } catch (Exception e) {
            return null;
        }
    }
}
