package com.sobczyk.food_management.security;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class LoginRequest {

    @NotNull
    public String login;

    @NotNull
    public String password;
}
