package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"version", "email"})
public class UserDetailsToChangeDto {

    public String email;

    public Long version;
}
