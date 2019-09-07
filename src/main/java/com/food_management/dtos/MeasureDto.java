package com.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({"id", "measureName", "version"})
public class MeasureDto {

    public Long id;

    public String measureName;

    public Long version;

}
