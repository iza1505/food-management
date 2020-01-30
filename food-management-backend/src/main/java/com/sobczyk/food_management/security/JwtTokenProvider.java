package com.sobczyk.food_management.security;

import com.sobczyk.food_management.exceptions.IncompatibilityDataException;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationDateInMs}") //1h
    private int jwtExpirationInMs;

    @Value("${app.jwtPasswordExpirationDateInMs}") //5min
    private int jwtPasswordExpirationDateInMs;

    public String generateToken(Authentication authentication) {

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);
        Claims claims = Jwts.claims().setSubject(userPrincipal.getLogin());
        claims.put("roles", userPrincipal.getAuthorities());
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String generatePasswordToken(String email, String hashPasswordHash) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtPasswordExpirationDateInMs);
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("hashPasswordHash", hashPasswordHash);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String generateActivationToken(String email, String hashPasswordHash) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("hashPasswordHash", hashPasswordHash);
        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }


    public String getEmailFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public String getHashPasswordHashFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();

        return claims.get("hashPasswordHash", String.class);
    }

    public String getUserLoginFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
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
            Jws<Claims> claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            if (claims.getBody().getExpiration().before(new Date())) {
                throw new IncompatibilityDataException("Password token out of date.","exception.passwordToken");
            }
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtException("exception.passwordToken");
        }
    }
}
