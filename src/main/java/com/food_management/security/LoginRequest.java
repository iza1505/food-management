package com.food_management.security;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    public String login;

    public String password;
}
