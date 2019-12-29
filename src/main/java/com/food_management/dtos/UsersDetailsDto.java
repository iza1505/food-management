package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonPropertyOrder({"role", "active"})
public class UsersDetailsDto extends MyDetailsUserDto {

    public String role;

    public Boolean active;

    @Builder
    public UsersDetailsDto(Long id, Long version, String login, String email, String role, Boolean active){
        super(id, version, login, email);
        this.role = role;
        this.active = active;
    }
}
