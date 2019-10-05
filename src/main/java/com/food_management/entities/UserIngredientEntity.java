package com.food_management.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name="user_ingredient")
public class UserIngredientEntity {

    @EmbeddedId
    private UserIngredientKey userIngredientKey;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @Version
    @Column(nullable = false)
    private Long version;
}
