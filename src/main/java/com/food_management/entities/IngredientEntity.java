package com.food_management.entities;

import lombok.*;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "ingredient")
public class IngredientEntity extends BaseEntity {

    @Column(name = "ingredient_name", unique = true, length = 50)
    private String ingredientName;

    @ManyToOne
    @JoinColumn(name = "measure_id")
    private MeasureEntity measure;
}
