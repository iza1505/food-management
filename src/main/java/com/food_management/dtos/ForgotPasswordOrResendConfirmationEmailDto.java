package com.food_management.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgotPasswordOrResendConfirmationEmailDto {

    public String login;

    public String email;
}
