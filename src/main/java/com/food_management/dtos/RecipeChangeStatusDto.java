package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"active", "waitingForAccept", "toImprove"})
public class RecipeChangeStatusDto {

    public Boolean active;

    public Boolean waitingForAccept;

    public String toImprove;

}
