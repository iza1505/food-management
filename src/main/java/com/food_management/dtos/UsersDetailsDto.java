package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"role", "active"})
public class UsersDetailsDto extends MyDetailsUserDto {

    public String role;

    public Boolean active;

}
