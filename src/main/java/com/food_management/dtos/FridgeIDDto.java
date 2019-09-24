package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"userId", "ingredientId"})
public class FridgeIDDto {

    public Long userId;

    public Long ingredientId;

}
