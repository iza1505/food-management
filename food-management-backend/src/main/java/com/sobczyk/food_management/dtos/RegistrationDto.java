package com.sobczyk.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"login", "email", "password", "role"})
public class RegistrationDto {

    public String login;

    public String email;

    public String password;

    public String role;
}
