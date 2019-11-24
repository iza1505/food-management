package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

import java.util.List;


@Data
@JsonPropertyOrder({"id", "version", "title", "preparationMins", "description", "ingredients", })
public class RecipeUpdateDto {

    public Long id;

    public Long version;

    public String title;

    public Integer preparationMins;

    public String description;

    public List<IngredientInFridgeAndRecipeDto> ingredients;

}
