package com.sobczyk.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"login", "email", "password", "role","language","creatorLogin"})
public class RegistrationDto {

    public String login;

    public String email;

    public String password;

    public String role;

    public String language;

    public String creatorLogin;
}
