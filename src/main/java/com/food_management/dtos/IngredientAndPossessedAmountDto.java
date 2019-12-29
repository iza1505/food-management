package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonPropertyOrder({"ingredient", "amount", "hasGot", "version"})
public class IngredientAndPossessedAmountDto {

    private IngredientDto ingredient;

    private Double amount;

    private Integer hasGot;

    private Long version;
}
