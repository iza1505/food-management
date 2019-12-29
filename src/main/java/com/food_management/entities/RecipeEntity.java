package com.food_management.entities;

import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "recipe")
public class RecipeEntity extends BaseEntity  {

    @Column(name = "title", nullable = false, unique = true, length = 200)
    private String title;

    @Column(name = "preparation_mins", nullable = false, length = 50)
    private Integer preparationMins;

    @Column(name = "description", nullable = false, unique = true)
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @OneToMany(mappedBy = "recipeIngredientKey.recipe", cascade = CascadeType.REMOVE)
    private List<RecipeIngredientEntity> recipeIngredients = new ArrayList<>();

    @Column(name = "active", nullable = false)
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private Boolean active;

    @Column(name = "waiting_for_accept", nullable = false)
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private Boolean waitingForAccept;

    @Column(name = "to_improve")
    private String toImprove;
}
