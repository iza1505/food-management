package com.food_management.entities;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Embeddable
public class FridgeID implements Serializable {
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "ingredient_id", nullable = false)
    private Long ingredientId;

    public FridgeID(){ }

    public FridgeID(Long userId, Long ingredientId){
        this.userId = userId;
        this.ingredientId = ingredientId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FridgeID)) return false;
        FridgeID that = (FridgeID) o;
        return Objects.equals(getUserId(), that.getUserId()) &&
                Objects.equals(getIngredientId(), that.getIngredientId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserId(), getIngredientId());
    }

}
