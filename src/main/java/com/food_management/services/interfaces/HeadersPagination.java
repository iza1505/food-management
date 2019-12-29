package com.food_management.services.interfaces;

import com.food_management.dtos.HeadersDto;

import java.util.List;

public interface HeadersPagination {
    HeadersDto createHeaderDto(Integer elementsOnPage, Integer currentPage, List<?> headers, String sortBy,
                               Boolean ascendingSort);
}
