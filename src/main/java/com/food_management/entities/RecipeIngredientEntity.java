package com.food_management.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name="recipe_ingredient")
public class RecipeIngredientEntity {

    @EmbeddedId
    private RecipeIngredientKey recipeIngredientKey;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @Version
    @Column(nullable = false)
    private Long version;
}
