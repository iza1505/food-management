package com.food_management.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "ingredient")
public class IngredientEntity extends BaseEntity {

    @Column(name = "ingredient_name", unique = true, nullable = false, length = 50)
    private String ingredientName;

    @ManyToOne
    @JoinColumn(name = "measure_id",
            foreignKey = @ForeignKey(name = "FK__ingredient_measure_id"))
    private MeasureEntity measure;
}
