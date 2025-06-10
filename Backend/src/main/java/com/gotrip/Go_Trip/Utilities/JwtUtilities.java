package com.gotrip.Go_Trip.Utilities;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.stereotype.Component;

import io.github.cdimascio.dotenv.Dotenv;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtilities {

    private final String jwtSecret;
    private static final long EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 horas

    public JwtUtilities() {
        Dotenv dotenv = Dotenv.load();
        this.jwtSecret = dotenv.get("SECRET_KEY");
    }

    // Genera un token JWT con claims personalizados
    public String generateToken(String id, String username, String email) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", id);
        claims.put("username", username);
        claims.put("email", email);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    // Valida un token JWT y devuelve true/false
    public boolean validateToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            System.err.println("Firma JWT inválida: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.err.println("Token JWT malformado: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.err.println("Token JWT expirado: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Error general con el token: " + e.getMessage());
        }
        return false;
    }

    // Extrae todos los claims del token
    public Map<String, Object> parseToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // --- Métodos específicos para extraer datos ---
    public String getUsernameFromToken(String token) {
        return (String) parseToken(token).get("username");
    }

    public String getIdFromToken(String token) {
        return (String) parseToken(token).get("id");
    }

    public String getEmailFromToken(String token) {
        return (String) parseToken(token).get("email");
    }

    // Extrae el username desde el header "Bearer <token>"
    public String getUsernameFromAuthorizationHeader(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Header de autorización inválido");
        }
        String token = authorizationHeader.substring(7);
        return getUsernameFromToken(token);
    }
}