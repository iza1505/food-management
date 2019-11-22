package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"user", "active", "waitingForAccept", "toImprove"})
public class RecipeHeaderAdminDto extends RecipeHeaderDto {

    public String userLogin;

    public Boolean active;

    public Boolean waitingForAccept;

    public String toImprove;

}
