package com.sobczyk.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonPropertyOrder({"version", "email"})
public class UserDetailsToChangeDto {

    public String email;

    public Long version;
}
