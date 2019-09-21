package com.food_management.services.interfaces;

import com.food_management.dtos.UserDto;
import com.food_management.entities.UserEntity;
import org.springframework.security.core.Authentication;


public interface UserService extends BaseService<UserEntity, UserDto> {

    UserEntity findByLogin(String login);

    Authentication authenticate(String login, String password);
}
