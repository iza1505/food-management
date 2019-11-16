package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"id", "version", "title", "active", "waitingForAccept", "toImprove"})
public class RecipeHeaderUserDto {

    public Long id;

    public Long version;

    public String title;

    public Integer missingIngredientsAmount;

    public Integer percentageToCook;

}
