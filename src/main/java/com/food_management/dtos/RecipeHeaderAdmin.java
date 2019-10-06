package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"id", "version", "title", "user", "active", "waitingForAccept"})
public class RecipeHeaderAdmin {

    public Long id;

    public Long version;

    public String title;

    public UserDto user;

    public Boolean active;

    public Boolean waitingForAccept;
}
