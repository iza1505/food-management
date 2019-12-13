package com.food_management.services.interfaces;

import com.food_management.dtos.UserDto;
import com.food_management.entities.UserEntity;
import com.food_management.entities.UserIngredientEntity;
import org.springframework.security.core.Authentication;

import java.util.List;


public interface UserService extends BaseService<UserEntity, UserDto> {

    UserEntity findByLogin(String login);

    UserEntity findByEmail(String email);

    Authentication authenticate(String login, String password);

    Integer getIngredientPercentage(Long id, List<UserIngredientEntity> userIngredients);

    void forgotPassword(String email);

    void resetPassword(String newPassword, String token);
}
