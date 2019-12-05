package com.food_management.entities;

import lombok.*;
import org.hibernate.annotations.Type;

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

    @Column(name = "active", nullable = false)
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private Boolean active;
}
