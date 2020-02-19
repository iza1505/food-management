package com.sobczyk.food_management.security;

import com.sobczyk.food_management.exceptions.IncompatibilityDataException;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JsonWebTokenProvider {

    @Value("${app.jwtSecret}")
    private String jsonWebTokenSecret;

    @Value("${app.jwtExpirationDateInMs}") //1h
    private int jsonWebTokenExpirationInMs;

    @Value("${app.jwtPasswordExpirationDateInMs}") //5min
    private int jsonWebTokenPasswordExpirationDateInMs;

    public String generateJsonWebToken(Authentication authentication) {

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date currentDate = new Date();
        Date expirationTime = new Date(currentDate.getTime() + jsonWebTokenExpirationInMs);
        Claims jsonWebTokenClaims = Jwts.claims().setSubject(userPrincipal.getLogin());
        jsonWebTokenClaims.put("role", userPrincipal.getAuthorities());
        return Jwts.builder()
                .setClaims(jsonWebTokenClaims)
                .setIssuedAt(new Date())
                .setExpiration(expirationTime)
                .signWith(SignatureAlgorithm.HS512, jsonWebTokenSecret)
                .compact();
    }

    public String generatePasswordToken(String email, String hashPasswordHash) {
        Date currentDate = new Date();
        Date expirationTime = new Date(currentDate.getTime() + jsonWebTokenPasswordExpirationDateInMs);
        Claims jsonWebTokenClaims = Jwts.claims().setSubject(email);
        jsonWebTokenClaims.put("hashPasswordHash", hashPasswordHash);
        return Jwts.builder()
                .setClaims(jsonWebTokenClaims)
                .setIssuedAt(new Date())
                .setExpiration(expirationTime)
                .signWith(SignatureAlgorithm.HS512, jsonWebTokenSecret)
                .compact();
    }

    public String generateActivationToken(String email, String hashPasswordHash) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("hashPasswordHash", hashPasswordHash);
        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, jsonWebTokenSecret)
                .compact();
    }


    public String getEmailFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jsonWebTokenSecret)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public String getHashPasswordHashFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jsonWebTokenSecret)
                .parseClaimsJws(token)
                .getBody();

        return claims.get("hashPasswordHash", String.class);
    }

    public String getUserLoginFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jsonWebTokenSecret)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(jsonWebTokenSecret).parseClaimsJws(token);
            if (claims.getBody().getExpiration().before(new Date())) {
                return false;
            }
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtException("exception.token");
        }
    }

    public void validatePasswordToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(jsonWebTokenSecret).parseClaimsJws(token);
            if (claims.getBody().getExpiration().before(new Date())) {
                throw new IncompatibilityDataException("Password token out of date.","exception.passwordToken");
            }
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtException("exception.passwordToken");
        }
    }
}
