package com.sobczyk.food_management.security;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtAuthenticationResponse {

    public String accessToken;

    public String tokenType = "Bearer";

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
