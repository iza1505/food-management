package com.food_management.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name="user_ingredient")
public class UserIngredientEntity {

    @EmbeddedId
    @JsonIgnore
    private UserIngredientKey userIngredientKey;

    @ManyToOne
    @MapsId("userId")
    @PrimaryKeyJoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @MapsId("ingredientId")
    @PrimaryKeyJoinColumn(name = "ingredient_id")
    private IngredientEntity ingredient;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @Version
    @Column(nullable = false)
    private Long version;
}
