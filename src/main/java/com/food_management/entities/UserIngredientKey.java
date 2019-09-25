package com.food_management.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
public class UserIngredientKey implements Serializable {

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long ingredientId;

}
