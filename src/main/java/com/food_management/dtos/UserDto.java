package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonPropertyOrder({"id", "version", "login", "email", "passwordHash", "role", "active"})
public class UserDto {

    public Long id;

    public Long version;

    public String login;

    public String email;

    public String passwordHash;

    public RoleDto role;

    public Boolean active;

}
