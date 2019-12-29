package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonPropertyOrder({"id", "version", "title", "preparationMins", "description", "ingredients", "userName" })
public class RecipeUpdateDto {

    public Long id;

    public Long version;

    public String title;

    public Integer preparationMins;

    public String description;

    public String userName;

    public List<IngredientInFridgeAndRecipeDto> ingredients;

}
