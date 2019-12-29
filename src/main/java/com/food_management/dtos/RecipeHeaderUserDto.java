package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonPropertyOrder({"missingIngredientsAmount", "percentageToCook" })
public class RecipeHeaderUserDto extends RecipeHeaderDto {

    public Integer missingIngredientsAmount;

    public Integer percentageToCook;

    @Builder
    public RecipeHeaderUserDto(Long id, Long version, String title, Integer missingIngredientsAmount, Integer percentageToCook){
        super(id, version, title);
        this.missingIngredientsAmount = missingIngredientsAmount;
        this.percentageToCook = percentageToCook;
    }

}
