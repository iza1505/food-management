package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"id",  "version", "name"})
public class RoleDto {

    public Long id;

    public Long version;

    public String name;


}
