package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonPropertyOrder({"active", "waitingForAccept", "toImprove"})
public class RecipeHeaderForAuthorDto extends RecipeHeaderDto {

    public Boolean active;

    public Boolean waitingForAccept;

    public String toImprove;

    public RecipeHeaderForAuthorDto(Long id, Long version, String title, Boolean active, Boolean waitingForAccept, String toImprove) {
        super(id, version, title);
        this.active = active;
        this.waitingForAccept = waitingForAccept;
        this.toImprove = toImprove;
    }
}
