package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"missingIngredientsAmount", "percentageToCook" })
public class RecipeHeaderUserDto extends RecipeHeaderDto {

    public Integer missingIngredientsAmount;

    public Integer percentageToCook;

}
