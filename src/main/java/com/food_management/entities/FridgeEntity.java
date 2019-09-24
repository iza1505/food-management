package com.food_management.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name="fridge")
public class FridgeEntity {

    @EmbeddedId
//    @AttributeOverrides({
//            @AttributeOverride(name="user_id",
//                    column=@Column(name="user_id")),
//            @AttributeOverride(name="ingredient_id",
//                    column=@Column(name="ingredient_id"))
//    })
    private FridgeID fridgeID;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @MapsId("userId")
//    private UserEntity user;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @MapsId("ingredientId")
//    private IngredientEntity ingredient;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @Version
    @Column(nullable = false)
    private Long version;
}
