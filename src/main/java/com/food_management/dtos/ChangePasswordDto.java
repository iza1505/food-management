package com.food_management.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordDto {

    public String oldPassword;

    public String newPassword;
}
