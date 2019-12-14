package com.food_management.services.interfaces;

import com.food_management.dtos.*;
import com.food_management.entities.UserEntity;
import com.food_management.entities.UserIngredientEntity;
import org.springframework.security.core.Authentication;

import java.util.List;


public interface UserService {

    UserEntity convertToEntity(UserDto dto);

    UserDto convertToDto(UserEntity entity);

    void add(RegistrationDto registrationDto);

    void confirmAccount(String token) throws Exception;

    UserEntity findByLogin(String login);

    UserEntity findByEmail(String email);

    UserEntity findById(Long id);

    Authentication authenticate(String login, String password);

    Integer getIngredientPercentage(Long id, List<UserIngredientEntity> userIngredients);

    void forgotPassword(String email);

    void resetPassword(String newPassword, String token);

    MyDetailsUserDto getMyDetails();

    UserDetailsToChangeDto updateDetails(UserDetailsToChangeDto dto);

    HeadersDto findAll(Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort);
}
