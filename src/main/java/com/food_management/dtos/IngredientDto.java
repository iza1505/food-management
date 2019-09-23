package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"id", "ingredientName", "measure", "version"})
public class IngredientDto {

    public Long id;

    public Long version;

    public String ingredientName;

    public MeasureDto measure;
}
