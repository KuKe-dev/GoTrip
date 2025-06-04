package com.gotrip.Go_Trip.Utilities;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
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

    public boolean deleteImage(String imageUrl) throws IOException {
    if (imageUrl == null || imageUrl.isEmpty()) {
        System.err.println("URL de imagen no proporcionada");
        return false;
    }

    String publicId = extractPublicIdFromUrl(imageUrl);
        if (publicId == null) {
            System.err.println("No se pudo extraer public_id de la URL: " + imageUrl);
            return false;
        }

        try {
            Map<?, ?> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            String deletionResult = (String) result.get("result");
            
            if ("ok".equals(deletionResult)) {
                System.out.println("Imagen eliminada correctamente: " + publicId);
                return true;
            } else {
                System.err.println("Cloudinary no pudo eliminar la imagen. Resultado: " + deletionResult);
                return false;
            }
        } catch (Exception e) {
            System.err.println("Error al eliminar imagen de Cloudinary: " + e.getMessage());
            throw new IOException("Error al eliminar imagen de Cloudinary", e);
        }
}

    private String extractPublicIdFromUrl(String url) {
    if (url == null || url.isEmpty()) {
        return null;
    }

    try {
        // Ejemplo de URL: https://res.cloudinary.com/tu_cloud/image/upload/v1621234567/folder/subfolder/public_id.jpg
        URI uri = new URI(url);
        String path = uri.getPath();
        
        // Encuentra el índice de 'upload/'
        int uploadIndex = path.indexOf("upload/");
        if (uploadIndex == -1) {
            return null;
        }
        
        // Obtiene la parte después de 'upload/'
        String afterUpload = path.substring(uploadIndex + 7); // 7 es la longitud de "upload/"
        
        // Elimina cualquier parámetro de transformación (si existe)
        if (afterUpload.contains("/")) {
            afterUpload = afterUpload.substring(afterUpload.indexOf("/") + 1);
        }
        
        // Elimina la extensión del archivo
        int dotIndex = afterUpload.lastIndexOf('.');
        if (dotIndex > 0) {
            afterUpload = afterUpload.substring(0, dotIndex);
        }
        
        return afterUpload;
    } catch (Exception e) {
        System.err.println("Error al extraer public_id de URL: " + url);
        return null;
    }
}
}
