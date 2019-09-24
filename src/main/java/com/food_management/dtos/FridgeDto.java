package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
//@JsonPropertyOrder({"id", "version", "user", "ingredient", "amount"})
@JsonPropertyOrder({"id", "version", "amount"})
public class FridgeDto {

    private FridgeIDDto id;

    private Long version;

//    private UserDto user;
//
//    private IngredientDto ingredient;

    private Double amount;


}
