package com.sobczyk.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonPropertyOrder({"id", "version", "title"})
public class RecipeHeaderDto {

    public Long id;

    public Long version;

    public String title;

}
