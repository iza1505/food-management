package com.food_management.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeActiveStatusDto {

    public Long id;

    public Boolean active;

    public Long version;

}
