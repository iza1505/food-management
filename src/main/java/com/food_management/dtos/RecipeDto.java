package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

import java.util.List;

@Data
@JsonPropertyOrder({"id", "version", "title", "preparationMins", "description", "user", "ingredients", "active", "waitingForAccept", "toImprove"})
public class RecipeDto {

    public Long id;

    public Long version;

    public String title;

    public Integer preparationMins;

    public String description;

    public UserDto user;

    public List<IngredientInFridgeAndRecipeDto> ingredients;

    public Boolean active;

    public Boolean waitingForAccept;

    public String toImprove;
}
