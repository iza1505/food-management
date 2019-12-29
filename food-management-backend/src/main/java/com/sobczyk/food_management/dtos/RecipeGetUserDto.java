package com.sobczyk.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonPropertyOrder({"id", "version", "title", "preparationMins", "description", "userName", "ingredients"})
public class RecipeGetUserDto {

    public Long id;

    public Long version;

    public String title;

    public Integer preparationMins;

    public String description;

    public String userName;

    public List<IngredientAndPossessedAmountDto> ingredients;

    //public HashMap<IngredientInFridgeAndRecipeDto, Integer> ingredients; // ten integer to % mozliwy do ugotowania, przy get dla usera

}

