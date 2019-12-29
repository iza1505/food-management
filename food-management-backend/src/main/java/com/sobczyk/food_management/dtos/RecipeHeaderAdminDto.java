package com.sobczyk.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonPropertyOrder({"userLogin", "active", "waitingForAccept", "toImprove"})
public class RecipeHeaderAdminDto extends RecipeHeaderDto {

    public String userLogin;

    public Boolean active;

    public Boolean waitingForAccept;

    public String toImprove;

    @Builder
    public RecipeHeaderAdminDto(Long id, Long version, String title, String userLogin, Boolean active, Boolean waitingForAccept, String toImprove){
        super(id, version, title);
        this.userLogin = userLogin;
        this.active = active;
        this.waitingForAccept = waitingForAccept;
        this.toImprove = toImprove;
    }

}
