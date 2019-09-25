package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"version", "user", "ingredient", "amount"})
public class UserIngredientDto {

    private Long version;

    private UserDto user;

    private IngredientDto ingredient;

    private Double amount;


}
