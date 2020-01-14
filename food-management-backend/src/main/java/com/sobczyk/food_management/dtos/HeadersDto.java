package com.sobczyk.food_management.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

import java.util.List;

@Data
@JsonPropertyOrder({"headers", "pageCount", "currentPage" })
public class HeadersDto {

    public List<?> headers;

    public Integer pageCount;

    public Integer currentPage;
}
