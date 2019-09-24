package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"ingredient", "amount", "version"})
public class UserFood {
    private IngredientDto ingredient;

    private Double amount;

    private Long version;
}
