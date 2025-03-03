package com.sobczyk.food_management.services.impl;

import com.sobczyk.food_management.dtos.HeadersDto;
import com.sobczyk.food_management.services.interfaces.HeadersPagination;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class HeadersPaginationImpl implements HeadersPagination {

    public HeadersDto createHeaderDto(Integer elementsOnPage, Integer currentPage, List<?> headers, String sortBy,
                                      Boolean ascendingSort) {
        HeadersDto headersDto = new HeadersDto();
        if (headers.size() > 0) {
            PagedListHolder<?> pageHolder;

            if (sortBy != null) {
                if (ascendingSort != null) {
                    pageHolder =
                            new PagedListHolder<>(headers, new MutableSortDefinition(sortBy, true, ascendingSort));
                } else {
                    pageHolder = new PagedListHolder<>(headers, new MutableSortDefinition(sortBy, true, true));
                }
                pageHolder.resort();
            } else {
                pageHolder = new PagedListHolder<>(headers);
            }

            pageHolder.setPageSize(elementsOnPage);
            pageHolder.setPage(currentPage - 1);
            Integer pageCount = pageHolder.getPageCount();

            List<?> recipeHeadersOnPage = pageHolder.getPageList();
            headersDto.setHeaders(recipeHeadersOnPage);
            headersDto.setPageCount(pageCount);
        } else {
            headersDto.setHeaders(headers);
            headersDto.setPageCount(1);
        }

        headersDto.setCurrentPage(currentPage);

        return headersDto;
    }
}
