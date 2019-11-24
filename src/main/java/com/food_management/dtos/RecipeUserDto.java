package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

import java.util.Map;

@Data
@JsonPropertyOrder({"id", "version", "title", "preparationMins", "description", "userName", "ingredients"})
public class RecipeUserDto {

    public Long id;

    public Long version;

    public String title;

    public Integer preparationMins;

    public String description;

    public String userName;

    public Map<IngredientInFridgeAndRecipeDto, Integer> ingredients; // ten integer to % mozliwy do ugotowania, przy get dla usera

}

