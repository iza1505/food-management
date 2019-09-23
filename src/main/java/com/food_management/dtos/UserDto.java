package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"id", "version", "login", "email", "passwordHash", "role"})
public class UserDto {

    public Long id;

    public Long version;

    public String login;

    public String email;

    public String passwordHash;

    public RoleDto role;


}
