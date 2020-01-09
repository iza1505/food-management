package com.sobczyk.food_management.dtos;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ForgotPasswordOrResendConfirmationEmailDto {

    @NotNull
    public String email;
}
