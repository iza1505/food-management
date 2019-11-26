package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"ingredient", "amount"})
public class IngredientAndPercentageDto {

    private IngredientDto ingredient;

    private Integer amount;
}
