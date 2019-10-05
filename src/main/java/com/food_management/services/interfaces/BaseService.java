package com.food_management.services.interfaces;

import java.util.List;

public interface BaseService<TModel, UDto> {

    List<UDto> findAll();

    UDto add(UDto dto);

    UDto update(UDto dto);

    void deleteById(Long id);

    TModel findById(Long id);

    TModel convertToEntity(UDto dto);

    UDto convertToDto(TModel entity);

}