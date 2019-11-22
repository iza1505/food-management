package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

import java.util.List;

@Data
@JsonPropertyOrder({"recipeHeaders", "pageCount" })
public class RecipeHeadersDto {
    public List<? extends RecipeHeaderDto> recipeHeaders;

    public Integer pageCount;
}


