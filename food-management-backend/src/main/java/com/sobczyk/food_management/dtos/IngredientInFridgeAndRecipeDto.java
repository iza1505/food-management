package com.sobczyk.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonPropertyOrder({"ingredient", "amount", "version"})
public class IngredientInFridgeAndRecipeDto {

    private IngredientDto ingredient;

    private Double amount;

    private Long version;
}
